package com.drumscore.controller;

import com.drumscore.dto.request.CreateScoreRequest;
import com.drumscore.dto.request.SaveBarRequest;
import com.drumscore.dto.response.BarResponse;
import com.drumscore.dto.response.ScoreResponse;
import com.drumscore.dto.response.ScoreSummaryResponse;
import com.drumscore.service.DrumScoreService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * 비로그인(Guest) 악보 API.
 * guestId는 프론트엔드에서 UUID를 생성해 localStorage에 저장 후 헤더로 전달.
 */
@RestController
@RequestMapping("/api/guest/scores")
@RequiredArgsConstructor
public class GuestScoreController {

    private final DrumScoreService scoreService;

    @PostMapping
    public ResponseEntity<ScoreResponse> createScore(
            @RequestHeader("X-Guest-Id") String guestId,
            @Valid @RequestBody CreateScoreRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(scoreService.createGuestScore(guestId, request));
    }

    @GetMapping
    public ResponseEntity<List<ScoreSummaryResponse>> getScores(
            @RequestHeader("X-Guest-Id") String guestId) {
        return ResponseEntity.ok(scoreService.getGuestScores(guestId));
    }

    @GetMapping("/{scoreId}")
    public ResponseEntity<ScoreResponse> getScore(
            @RequestHeader("X-Guest-Id") String guestId,
            @PathVariable Long scoreId) {
        return ResponseEntity.ok(scoreService.getGuestScore(scoreId, guestId));
    }

    @PutMapping("/{scoreId}")
    public ResponseEntity<ScoreResponse> updateScore(
            @RequestHeader("X-Guest-Id") String guestId,
            @PathVariable Long scoreId,
            @Valid @RequestBody CreateScoreRequest request) {
        return ResponseEntity.ok(scoreService.updateGuestScore(scoreId, guestId, request));
    }

    @GetMapping("/{scoreId}/bars")
    public ResponseEntity<List<BarResponse>> getBars(
            @RequestHeader("X-Guest-Id") String guestId,
            @PathVariable Long scoreId) {
        return ResponseEntity.ok(scoreService.getBars(scoreId, guestId));
    }

    @PutMapping("/{scoreId}/bars/{barNumber}")
    public ResponseEntity<BarResponse> saveBar(
            @RequestHeader("X-Guest-Id") String guestId,
            @PathVariable Long scoreId,
            @PathVariable int barNumber,
            @Valid @RequestBody SaveBarRequest request) {
        return ResponseEntity.ok(scoreService.saveBar(scoreId, barNumber, request, guestId));
    }
}
