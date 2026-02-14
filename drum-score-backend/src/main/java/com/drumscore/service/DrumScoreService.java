package com.drumscore.service;

import com.drumscore.domain.Bar;
import com.drumscore.domain.DrumScore;
import com.drumscore.dto.request.CreateScoreRequest;
import com.drumscore.dto.request.SaveBarRequest;
import com.drumscore.dto.response.BarResponse;
import com.drumscore.dto.response.ScoreResponse;
import com.drumscore.dto.response.ScoreSummaryResponse;
import com.drumscore.repository.BarRepository;
import com.drumscore.repository.DrumScoreRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class DrumScoreService {

    private final DrumScoreRepository scoreRepository;
    private final BarRepository barRepository;

    // ── Guest ────────────────────────────────────────────

    @Transactional
    public ScoreResponse createGuestScore(String guestId, CreateScoreRequest req) {
        DrumScore score = DrumScore.createForGuest(
                guestId, req.getTitle(),
                req.getTimeSigNumerator(), req.getTimeSigDenominator(),
                req.getTempo()
        );
        score.setDescription(req.getDescription());
        scoreRepository.save(score);

        // 첫 마디 자동 생성
        Bar firstBar = Bar.of(score, 1, "[]");
        barRepository.save(firstBar);

        return toScoreResponse(score);
    }

    public List<ScoreSummaryResponse> getGuestScores(String guestId) {
        return scoreRepository.findByGuestIdOrderByUpdatedAtDesc(guestId)
                .stream().map(ScoreSummaryResponse::new).toList();
    }

    public ScoreResponse getGuestScore(Long scoreId, String guestId) {
        DrumScore score = scoreRepository.findByIdAndGuestId(scoreId, guestId)
                .orElseThrow(() -> new EntityNotFoundException("악보를 찾을 수 없습니다."));
        return toScoreResponse(score);
    }

    // ── 마디 저장 (Guest / 로그인 공통) ─────────────────

    @Transactional
    public BarResponse saveBar(Long scoreId, int barNumber, SaveBarRequest req, String guestId) {
        DrumScore score = findScoreByGuest(scoreId, guestId);
        return upsertBar(score, barNumber, req.getNotes());
    }

    @Transactional
    public BarResponse saveBarForUser(Long scoreId, int barNumber, SaveBarRequest req, Long userId) {
        DrumScore score = scoreRepository.findByIdAndUserId(scoreId, userId)
                .orElseThrow(() -> new EntityNotFoundException("악보를 찾을 수 없습니다."));
        return upsertBar(score, barNumber, req.getNotes());
    }

    public List<BarResponse> getBars(Long scoreId, String guestId) {
        findScoreByGuest(scoreId, guestId); // 권한 확인
        return barRepository.findByScoreIdOrderByBarNumberAsc(scoreId)
                .stream().map(BarResponse::new).toList();
    }

    // ── 악보 메타데이터 수정 ──────────────────────────────

    @Transactional
    public ScoreResponse updateGuestScore(Long scoreId, String guestId, CreateScoreRequest req) {
        DrumScore score = findScoreByGuest(scoreId, guestId);
        score.setTitle(req.getTitle());
        score.setDescription(req.getDescription());
        score.setTimeSigNumerator(req.getTimeSigNumerator());
        score.setTimeSigDenominator(req.getTimeSigDenominator());
        score.setTempo(req.getTempo());
        return toScoreResponse(score);
    }

    // ── Private helpers ───────────────────────────────────

    private DrumScore findScoreByGuest(Long scoreId, String guestId) {
        return scoreRepository.findByIdAndGuestId(scoreId, guestId)
                .orElseThrow(() -> new EntityNotFoundException("악보를 찾을 수 없습니다."));
    }

    private BarResponse upsertBar(DrumScore score, int barNumber, String notes) {
        Bar bar = barRepository.findByScoreIdAndBarNumber(score.getId(), barNumber)
                .orElseGet(() -> Bar.of(score, barNumber, "[]"));
        bar.setNotes(notes);
        return new BarResponse(barRepository.save(bar));
    }

    private ScoreResponse toScoreResponse(DrumScore score) {
        List<BarResponse> bars = barRepository.findByScoreIdOrderByBarNumberAsc(score.getId())
                .stream().map(BarResponse::new).toList();
        return new ScoreResponse(score, bars);
    }
}
