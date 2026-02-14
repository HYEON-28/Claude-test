package com.drumscore.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SaveBarRequest {

    @NotNull
    private String notes; // JSON 문자열: [{"instrument":"KICK","position":0,"velocity":7}]
}
