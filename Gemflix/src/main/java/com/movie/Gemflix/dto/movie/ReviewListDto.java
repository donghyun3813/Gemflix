package com.movie.Gemflix.dto.movie;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.movie.Gemflix.entity.Movie;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ReviewListDto {
    private Long rvId;
    private String content;
    private String id;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
    private LocalDateTime regDate;
    private float score;
}
