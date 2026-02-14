package com.drumscore.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "bars",
       uniqueConstraints = @UniqueConstraint(columnNames = {"score_id", "bar_number"}))
@Getter
@Setter
@NoArgsConstructor
public class Bar {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "score_id", nullable = false)
    private DrumScore score;

    @Column(nullable = false)
    private int barNumber;

    // JSON 형식으로 저장: [{"instrument":"KICK","position":0,"velocity":7}, ...]
    @Column(columnDefinition = "JSON", nullable = false)
    private String notes = "[]";

    public static Bar of(DrumScore score, int barNumber, String notes) {
        Bar bar = new Bar();
        bar.score = score;
        bar.barNumber = barNumber;
        bar.notes = notes != null ? notes : "[]";
        return bar;
    }
}
