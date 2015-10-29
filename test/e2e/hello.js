describe('webrd', function() {
	
	browser.executeScript("window.localStorage.clear();");

	it('START FROM BEGINNING', function() {

    	browser.get('http://webrd.schnucks.com/');
    	$('.cta').click()

    	button = $('#map-search-field').element(by.xpath('..')).$('div button');
    	element(by.css('#map-search-field')).sendKeys('Brentwood').then(function(reso){
    		button.click();

    		element.all(by.css('.store-view-btns a')).get(1).click();

    		outer = element.all(by.css('.store_list div div div button')).get(0);
    		outer.getInnerHtml().then(function(html){
    			
    			outer.click().then(function(){
    				expect(browser.getCurrentUrl()).toContain('departments');
    				browser.driver.sleep(2000);
    				
    				element(by.css('.department-list a')).click().then(function(){
    					expect(browser.getCurrentUrl()).toContain('products');
    					browser.driver.sleep(1000);

    					element.all(by.css('ul#product-list li')).get(1).element(by.css('a')).click().then(function(){
    						
    						expect(browser.getCurrentUrl()).toContain('product-details');
    						browser.driver.sleep(2000);

    						element.all(by.css('.item_qty_group input')).get(2).click().then(function(){
	    						browser.driver.sleep(2000);

	    						element(by.css('#comments')).sendKeys('Please leave the tomatoes off. Thank you!').then(function(){
	    							
	    							element(by.css('.add-cart')).click().then(function(){
		    							browser.driver.sleep(2000);
		    							
		    							element(by.css('#rwd-menu form div div a')).click().then(function(){
		    								expect(browser.getCurrentUrl()).toContain('cart');

		    								browser.driver.sleep(2000);
		    								browser.pause();
		    							})
		    						})
	    						
	    						})
	    						
	    						
	    					});
    					
    					})
    					
    				})
    				
    			});
    		})
    		
    		
    		
    		//$('.store_list').element('div').element('div').element('a').click();
    	});

    	
  	});
});