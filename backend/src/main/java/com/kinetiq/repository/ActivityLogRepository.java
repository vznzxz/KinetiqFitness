package com.kinetiq.repository;

import com.kinetiq.model.ActivityLog;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ActivityLogRepository extends JpaRepository<ActivityLog, Long> {
    List<ActivityLog> findAllByOrderByTimestampDesc(Pageable pageable);

    @Query("SELECT a FROM ActivityLog a ORDER BY a.timestamp DESC")
    List<ActivityLog> findTop50Logs();
}
