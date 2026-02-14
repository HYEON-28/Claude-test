package com.drumscore.dto.request;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateScoreRequest {

    @NotBlank(message = "제목은 필수입니다.")
    private String title;

    private String description;

    @Min(2) @Max(12)
    private int timeSigNumerator = 4;

    @Min(4) @Max(8)
    private int timeSigDenominator = 4;

    @Min(40) @Max(300)
    private int tempo = 120;
}
