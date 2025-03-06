package com.springboot.carrotmarket.repository;


import com.springboot.carrotmarket.entity.Item;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ItemRepository extends JpaRepository<Item, Long> {
}
