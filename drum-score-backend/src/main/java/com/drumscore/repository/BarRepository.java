package com.drumscore.repository;

import com.drumscore.domain.Bar;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface BarRepository extends JpaRepository<Bar, Long> {

    List<Bar> findByScoreIdOrderByBarNumberAsc(Long scoreId);

    Optional<Bar> findByScoreIdAndBarNumber(Long scoreId, int barNumber);
}
