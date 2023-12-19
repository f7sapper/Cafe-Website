"use strict";

$(document).ready(() => {
		// Process each img tag inside the menu
			$("#menu img").each((index, img) => 
	{
			const oldURL = img.src; // Gets the src attribute
			const newURL = img.id; // Rollover image source

        // Preload rollover image
			const rolloverImage = new Image();
			rolloverImage.src = newURL;

        // Setup event handlers for hovering over an image
			$(img).hover(
				() => 
	{
			img.src = newURL; // Hover over
			var itemName = $(img).attr("alt");
			var itemInfo = getItemInfo(itemName);
			displayItemInfo(itemInfo.name, itemInfo.price);
    },
				() => 
	{
			img.src = oldURL; // Hover out
			clearItemInfo();
    }
    );

        // Click on menu images to add to the order
			$(img).click(function (e) 
	{
            e.preventDefault();
            var itemName = $(this).attr("alt");
            var itemInfo = getItemInfo(itemName);

        // Update order list and total
            updateOrderList(itemInfo.name, itemInfo.price);
            updateOrderTotal();

        // Clear rollover image and information
            clearRolloverImage();
            clearItemInfo();
    });
	}); 

		// Place Order button click event
			$("#place_order").click(function () 
	{
        // Check if the order is empty
			if (isOrderEmpty()) 
	{
        // Display a message to the user
            alert("Please add items to your order before placing it.");
    } 	
			else 
	{
        // Redirect to checkout.html
            window.location.href = "checkout.html";
    }
    });

		// Clear Order button click event
			$("#clear_order").click(function () 
	{
		// Clear order list and total
			$("#order").empty();
			$("#total").text("");

        // Clear rollover image and information
			clearRolloverImage();
			clearItemInfo();
    });

		// Function to preload images
			function preloadImages(images) 
	{
			for (var i = 0; i < images.length; i++) 
	{
            var img = new Image();
            img.src = "images/" + images[i];
    }
    }

		// Function to display rollover image
			function displayRolloverImage(src) 
	{
			$("#rollover_image").attr("src", src);
    }

		// Function to clear rollover image
			function clearRolloverImage() 
	{
			$("#rollover_image").attr("src", "");
    }

		// Function to display item information
			function displayItemInfo(itemName, itemPrice) 
	{
			$("#item_info").html("$" + itemPrice.toFixed(2) + " - " + itemName).show();
    }

		// Function to clear item information
			function clearItemInfo() {
			$("#item_info").html("").hide();
    }

		// Function to check if the order is empty
			function isOrderEmpty() 
	{
			return $("#order option").length === 0;
    }

		// Function to update order list
			function updateOrderList(itemName, itemPrice) 
			
	{
			$("#order").append("<option value='" + itemName + "'>$" + itemPrice.toFixed(2) + " - "  + itemName + "</option>");
    }


		// Function to update order total
			function updateOrderTotal()
	{
			var total = 0;
			$("#order option").each(function () 
	{
            var itemPrice = parseFloat($(this).text().replace("$", ""));
            total += itemPrice;
    });

			$("#total").text("Total: $" + total.toFixed(2));
    }

		// Function to get item info based on item name
			function getItemInfo(itemName) 
	{
        // Add logic to retrieve the price and name based on the item name
        // For simplicity, using placeholder prices and names
			var itemInfo = 
	{
				"espresso": { price: 1.95, name: "Espresso" },
				"latte": { price: 2.95, name: "Latte" },
				"cappuccino": { price: 3.45, name: "Cappuccino" },
				"coffee": { price: 1.75, name: "Coffee" },
				"biscotti": { price: 1.95, name: "Biscotti" },
				"scone": { price: 2.95, name: "Scone" },
    };

			return itemInfo[itemName] || { price: 0.00, name: "Unknown" }
    }
});






