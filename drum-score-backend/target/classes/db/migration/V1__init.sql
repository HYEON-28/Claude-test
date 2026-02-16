CREATE TABLE IF NOT EXISTS users
(
    id         BIGINT AUTO_INCREMENT PRIMARY KEY,
    email      VARCHAR(255) NOT NULL UNIQUE,
    password   VARCHAR(255) NOT NULL,
    username   VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS drum_scores
(
    id                    BIGINT AUTO_INCREMENT PRIMARY KEY,
    title                 VARCHAR(255) NOT NULL,
    description           TEXT,
    time_sig_numerator    INT          NOT NULL DEFAULT 4,
    time_sig_denominator  INT          NOT NULL DEFAULT 4,
    tempo                 INT          NOT NULL DEFAULT 120,
    user_id               BIGINT                DEFAULT NULL,
    guest_id              VARCHAR(36)           DEFAULT NULL,
    is_public             BOOLEAN      NOT NULL DEFAULT FALSE,
    created_at            TIMESTAMP             DEFAULT CURRENT_TIMESTAMP,
    updated_at            TIMESTAMP             DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_score_user FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS bars
(
    id         BIGINT AUTO_INCREMENT PRIMARY KEY,
    score_id   BIGINT NOT NULL,
    bar_number INT    NOT NULL,
    notes      JSON   NOT NULL DEFAULT (JSON_ARRAY()),
    CONSTRAINT fk_bar_score FOREIGN KEY (score_id) REFERENCES drum_scores (id) ON DELETE CASCADE,
    CONSTRAINT uk_score_bar UNIQUE (score_id, bar_number)
);
