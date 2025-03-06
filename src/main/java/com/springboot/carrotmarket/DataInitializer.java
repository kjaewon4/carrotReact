package com.springboot.carrotmarket;

import com.springboot.carrotmarket.entity.Item;
import com.springboot.carrotmarket.repository.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

// 초기 데이터를 DB에 저장
// CommandLineRunner 또는 **ApplicationRunner**를 사용하여 애플리케이션 시작 시 데이터를 자동으로 저장
@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private final ItemRepository itemRepository;

    public DataInitializer(ItemRepository itemRepository) {
        this.itemRepository = itemRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        // 초기 데이터 세팅
        Item item1 = new Item(null, "https://img.kwcdn.com/product/Fancyalgo/VirtualModelMatting/da570debbdddb304fa54cdee563cb06d.jpg?imageView2/2/w/800/q/70/format/webp", "RC 괴산기", 34961, "설명1", false);
        Item item2 = new Item(null, "https://img.kwcdn.com/product/open/efe92f973b264d7a9f15009491d244cd-goods.jpeg?imageView2/2/w/800/q/70/format/webp", "미니 드리프트 레이싱카", 49934, "설명2", false);
        Item item3 = new Item(null, "https://img.kwcdn.com/product/fancy/0898bc4e-7100-46bd-859f-42984261c236.jpg?imageView2/2/w/800/q/70/format/webp", "크레인 블록 세트", 19457, "설명3", false);

        // 데이터베이스에 초기 데이터 삽입
        itemRepository.save(item1);
        itemRepository.save(item2);
        itemRepository.save(item3);

    }
}
