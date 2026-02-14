package com.drumscore.dto.response;

import com.drumscore.domain.DrumScore;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
public class ScoreResponse {

    private final Long id;
    private final String title;
    private final String description;
    private final int timeSigNumerator;
    private final int timeSigDenominator;
    private final int tempo;
    private final int gridSize;
    private final boolean isPublic;
    private final List<BarResponse> bars;
    private final LocalDateTime createdAt;
    private final LocalDateTime updatedAt;

    public ScoreResponse(DrumScore score, List<BarResponse> bars) {
        this.id = score.getId();
        this.title = score.getTitle();
        this.description = score.getDescription();
        this.timeSigNumerator = score.getTimeSigNumerator();
        this.timeSigDenominator = score.getTimeSigDenominator();
        this.tempo = score.getTempo();
        this.gridSize = score.getGridSize();
        this.isPublic = score.isPublic();
        this.bars = bars;
        this.createdAt = score.getCreatedAt();
        this.updatedAt = score.getUpdatedAt();
    }
}
