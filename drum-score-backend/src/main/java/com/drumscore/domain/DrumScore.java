package com.drumscore.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "drum_scores")
@Getter
@Setter
@NoArgsConstructor
public class DrumScore {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(nullable = false)
    private int timeSigNumerator = 4;

    @Column(nullable = false)
    private int timeSigDenominator = 4;

    @Column(nullable = false)
    private int tempo = 120;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @Column(length = 36)
    private String guestId;

    @Column(nullable = false)
    private boolean isPublic = false;

    @OneToMany(mappedBy = "score", cascade = CascadeType.ALL, orphanRemoval = true)
    @OrderBy("barNumber ASC")
    private List<Bar> bars = new ArrayList<>();

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

    // Guest용 생성자
    public static DrumScore createForGuest(String guestId, String title,
                                            int timeSigNumerator, int timeSigDenominator, int tempo) {
        DrumScore score = new DrumScore();
        score.guestId = guestId;
        score.title = title;
        score.timeSigNumerator = timeSigNumerator;
        score.timeSigDenominator = timeSigDenominator;
        score.tempo = tempo;
        return score;
    }

    // 로그인 사용자용 생성자
    public static DrumScore createForUser(User user, String title,
                                           int timeSigNumerator, int timeSigDenominator, int tempo) {
        DrumScore score = new DrumScore();
        score.user = user;
        score.title = title;
        score.timeSigNumerator = timeSigNumerator;
        score.timeSigDenominator = timeSigDenominator;
        score.tempo = tempo;
        return score;
    }

    // 그리드 크기 계산 (16분음표 기준)
    public int getGridSize() {
        return timeSigNumerator * (16 / timeSigDenominator);
    }
}
