package com.springboot.carrotmarket.controller;

import com.springboot.carrotmarket.entity.Item;
import com.springboot.carrotmarket.repository.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
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

//        System.out.println(title);
//        System.out.println(price);
//
//        try {
//            // DB 저장 로직
//            Item item = new Item();
//            item.setTitle(title);  // 상품명
//            item.setPrice(price);  // 가격
//            item.setDescription(description);  // 상세 설명
//            item.setImg(img);
//
//            // 파일 처리 (img)
////            if (!img.isEmpty()) {
////                String filePath = saveFile(img);
////                item.setImg(filePath);  // 파일 경로 저장
////            }
//
//            itemRepository.save(item);  // DB에 저장
//
//            return "상품 등록 성공";
//        } catch (Exception e) {
//            e.printStackTrace();
//            return "상품 등록 실패";
//        }
    }
    // 파일을 저장하는 메서드
    private String saveFile(MultipartFile img) throws Exception {
        String fileName = img.getOriginalFilename();
        String filePath = "C:/uploads/" + fileName;  // 파일 저장 경로

        File uploadDir = new File("C:/uploads/");
        if (!uploadDir.exists()) {
            uploadDir.mkdirs();  // 디렉토리가 없으면 생성
        }

        img.transferTo(new File(filePath));  // 파일 저장
        return filePath;  // 파일 경로 반환
    }

    @DeleteMapping("/deleteItem/{id}")
    public void deleteItem(@PathVariable Long id){
        System.out.println("삭제할 ID: " + id); // id 값을 출력하여 확인

        itemRepository.deleteById(id);

    }

}
