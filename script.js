// Define a media query
const mediaQuery = window.matchMedia('(min-width: 0px) and (max-width: 749.9px)');

function handleWidthChange(e) {
    if (e.matches) {
        
            const buttons = document.querySelectorAll("#scroll-bars .bars");
            const wrapper = document.querySelector("#wrapper");
            var items = document.querySelectorAll('#showcase .item');
            const slides = document.querySelectorAll("#wrapper .item");
            
            function showAllItems() {
                items.forEach(function(item) {
                    item.style.display = 'block'; // Or use 'flex', 'grid' etc., depending on your layout
                });
            }            

            // buttons scroll to the corresponding slide
            buttons.forEach((button, index) => {
                button.addEventListener("click", () => {
                    // Calculate the scroll position of the corresponding slide
                    const scrollPosition = slides[index].offsetLeft;
                    wrapper.scrollLeft = scrollPosition;
            
                    // Update the active button
                    updateActiveButton();
                });
            });

            function updateActiveButton() {
              // Calculate the current active slide based on the scroll position
              const activeSlideIndex = Math.round(wrapper.scrollLeft / wrapper.scrollWidth * slides.length);
          
              // Update active state for buttons
              buttons.forEach((button, index) => {
                if (index === activeSlideIndex) {
                  button.classList.add('active');
                } else {
                  button.classList.remove('active');
                }
              });
            }
          
            // Initially show all items
            showAllItems()

            // Add scroll event listener to wrapper
            wrapper.addEventListener("scroll", updateActiveButton);
          
            // Initialize the first button as active
            updateActiveButton();
        ;
    } 
    else {
        
        var buttons = document.querySelectorAll('.scroll-bars-click .bars-2');
        var items = document.querySelectorAll('#showcase .item');
        var itemIdGlobal = "what-we-do";
        
        
        function navigateToItem(itemId) {
            items.forEach(function (item) {
                item.style.display = (item.id === itemId) ? 'block' : 'none';
            });
        }
            
        // Hide all items and then display the first item when the page loads
        items.forEach(function (item) {
        item.style.display = 'none';
        });
        if (items.length > 0) {
            items[0].style.display = 'block';
        }
    
        
        // Function to remove highlight from all buttons
        function removeHighlightFromAllButtons() {
            buttons.forEach(btn => btn.classList.remove('highlight'));
        }
            
        
        // Function to highlight a button
        function highlightButton(button) {
    
            var newId = button.textContent.trim().toLowerCase().replace(/\s+/g, '-')
            // Navigate to the item
            navigateToItem(newId);
            // if slide is different than the middle one
            if (newId < itemIdGlobal) {
                // 1 left of the middle index
                if (newId == "what-we-do") {
                    itemIdGlobal = button.textContent.trim().toLowerCase().replace(/\s+/g, '-');
                    var slideNum = Math.floor((Array.from(buttons).indexOf(button) + 1 ) / 3);
                    var buttonIndex = 0;
                }
                // 1 right of the middle index
                else if (itemIdGlobal == "who-we-serve") {
                    itemIdGlobal = button.textContent.trim().toLowerCase().replace(/\s+/g, '-');
                    var buttonIndex = 8;
                }
                // 2 right of the leftmost index
                else if (itemIdGlobal == "what-we-do") {
                    itemIdGlobal = button.textContent.trim().toLowerCase().replace(/\s+/g, '-');
                    var buttonIndex = 8;
                }
            }
        
            // if new slide is right of the first one or left of the last one
            else if (newId > itemIdGlobal) {
                // starting at the rightmost index
                if (itemIdGlobal == "our-priorities") {
                        
                    if (newId == "what-we-do") {
                        itemIdGlobal = button.textContent.trim().toLowerCase().replace(/\s+/g, '-');
                        var buttonIndex = 0;
                    }
                    if (newId == "who-we-serve") {
                        itemIdGlobal = button.textContent.trim().toLowerCase().replace(/\s+/g, '-');
                        var buttonIndex = 4;
                    }
                }
                // starting at the leftmost index
                else if (itemIdGlobal == "what-we-do") {
                    if (newId == "who-we-serve") {
                        itemIdGlobal = button.textContent.trim().toLowerCase().replace(/\s+/g, '-');
                        var buttonIndex = 4;
                    }
                }
            }
            else {
                itemIdGlobal = button.textContent.trim().toLowerCase().replace(/\s+/g, '-');
                console.log(itemIdGlobal);
                console.log("same");
        
                var slideNum = Math.floor((Array.from(buttons).indexOf(button) + 3) / 3);
                if (newId == "what-we-do") {
                    itemIdGlobal = button.textContent.trim().toLowerCase().replace(/\s+/g, '-');
                    var buttonIndex = 0;
                }
                else if (newId == "who-we-serve") {
                        itemIdGlobal = button.textContent.trim().toLowerCase().replace(/\s+/g, '-');
                        var buttonIndex = 4;
                    }
                    else if (newId == "our-priorities") {
                        itemIdGlobal = button.textContent.trim().toLowerCase().replace(/\s+/g, '-');
                        var buttonIndex = 8;
                    }
                }
            
            
                console.log("slide: " + slideNum);
                removeHighlightFromAllButtons();
            
                buttons[buttonIndex].classList.add('highlight');
            }
        
        
        // Add click event listeners to buttons
        buttons.forEach((button, index) => {
            button.addEventListener('click', () => {
                highlightButton(button);
            });
        });
    
        // Initially highlight the first set of buttons
            highlightButton(buttons[0]);
        ;
    }
}

// Check if addEventListener is supported for media queries
if (typeof mediaQuery.addEventListener === 'function') {
    mediaQuery.addEventListener('change', handleWidthChange);
} else {
    // Fallback for older browsers
    mediaQuery.addListener(handleWidthChange);
}

// Perform an initial check
handleWidthChange(mediaQuery);
