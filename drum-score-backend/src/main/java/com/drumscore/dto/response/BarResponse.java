package com.drumscore.dto.response;

import com.drumscore.domain.Bar;
import lombok.Getter;

@Getter
public class BarResponse {

    private final Long id;
    private final int barNumber;
    private final String notes; // JSON 문자열

    public BarResponse(Bar bar) {
        this.id = bar.getId();
        this.barNumber = bar.getBarNumber();
        this.notes = bar.getNotes();
    }
}
