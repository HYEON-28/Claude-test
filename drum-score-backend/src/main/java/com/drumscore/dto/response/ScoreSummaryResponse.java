package com.drumscore.dto.response;

import com.drumscore.domain.DrumScore;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class ScoreSummaryResponse {

    private final Long id;
    private final String title;
    private final int timeSigNumerator;
    private final int timeSigDenominator;
    private final int tempo;
    private final LocalDateTime updatedAt;

    public ScoreSummaryResponse(DrumScore score) {
        this.id = score.getId();
        this.title = score.getTitle();
        this.timeSigNumerator = score.getTimeSigNumerator();
        this.timeSigDenominator = score.getTimeSigDenominator();
        this.tempo = score.getTempo();
        this.updatedAt = score.getUpdatedAt();
    }
}
