package kr.or.connect.booking.dao.promotion;

import java.util.List;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import kr.or.connect.booking.config.ApplicationConfig;
import kr.or.connect.booking.dto.promotion.Promotion;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = {ApplicationConfig.class })
public class PromotionDaoTest {
	@Autowired
	private PromotionDao dao;
	
	@Test
	public void testDao() throws Exception{
		List<Promotion> list = dao.selectAll();
		for (Promotion data : list) {
			System.out.println(data);
		}
	}

}
