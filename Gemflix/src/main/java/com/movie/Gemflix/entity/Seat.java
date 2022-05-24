package com.movie.Gemflix.entity;

import lombok.*;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;


@Entity
@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString(exclude = "theaterRoom")
@Table(name = "SEAT")
public class Seat {

    @Id
    @Column(name = "SE_ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long seId;

    @ManyToOne
    @JoinColumn( name = "ROOM_ID")
    private TheaterRoom theaterRoom;

    private String seCol;

    private String seRow;
}
