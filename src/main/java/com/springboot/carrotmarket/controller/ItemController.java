package com.springboot.carrotmarket.controller;

import com.springboot.carrotmarket.entity.Item;
import com.springboot.carrotmarket.repository.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.UUID;

@RestController
public class ItemController {

    @Autowired
    private final ItemRepository itemRepository;

    public ItemController(ItemRepository itemRepository) {
        this.itemRepository = itemRepository;
    }

    @GetMapping("/hello")
    public String hello() {
        return "스프링부트랑 리액트 연동 완료 테스트";
    }

    @GetMapping("/")
    public List<Item> mainpage(){
        List<Item> items = itemRepository.findAll();
        return items;
    }

    @PostMapping("/addItem")
    public String addItem(@RequestBody Item item) {
        try {
            itemRepository.save(item);
            return "상품 등록 성공";
        } catch (Exception e) {
            e.printStackTrace();
            return "상품 등록 실패";
        }
    }

    @DeleteMapping("/deleteItem/{id}")
    public void deleteItem(@PathVariable Long id){
        System.out.println("삭제할 ID: " + id); // id 값을 출력하여 확인

        itemRepository.deleteById(id);

    }

    @PutMapping("/updateItem/{id}")
    public ResponseEntity<Item> updateItem(@PathVariable Long id, @RequestBody Item updatedItem) {
        try {
            Item item = itemRepository.findById(id)
                    .orElseThrow(() -> new IllegalArgumentException("해당 상품이 없습니다. ID: " + id));

            item.setImg(updatedItem.getImg());
            item.setTitle(updatedItem.getTitle());
            item.setPrice(updatedItem.getPrice());
            item.setDescription(updatedItem.getDescription());
            Item savedItem = itemRepository.save(item);

            return ResponseEntity.ok(savedItem);
        }catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

}
