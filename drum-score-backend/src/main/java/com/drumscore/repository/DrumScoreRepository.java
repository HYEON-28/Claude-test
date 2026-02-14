package com.drumscore.repository;

import com.drumscore.domain.DrumScore;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface DrumScoreRepository extends JpaRepository<DrumScore, Long> {

    List<DrumScore> findByUserIdOrderByUpdatedAtDesc(Long userId);

    List<DrumScore> findByGuestIdOrderByUpdatedAtDesc(String guestId);

    Optional<DrumScore> findByIdAndGuestId(Long id, String guestId);

    Optional<DrumScore> findByIdAndUserId(Long id, Long userId);
}
