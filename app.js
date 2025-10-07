document.addEventListener('DOMContentLoaded', () => {
    // TODO: Add search functionality to filter the calendar or food list.
    // TODO: Implement user profiles and settings (e.g., daily calorie goals).
    const addFoodForm = document.getElementById('add-food-form');
    const foodListContainer = document.getElementById('food-list');
    const calendarContainer = document.getElementById('calendar-container');

    const categoryIcons = {
        fish: '🐟',
        meat: '🥩',
        veggies: '🥦',
        sugar: '🍬',
        alcohol: '🍷'
    };

    // TODO: Add nutrition data visualization (e.g., charts for macros).
    const renderCalendar = async (date) => {
        calendarContainer.innerHTML = '';
        const month = date.getMonth();
        const year = date.getFullYear();

        const foodItems = await storage.get('foodItems') || [];

        const firstDayOfMonth = new Date(year, month, 1);
        const lastDayOfMonth = new Date(year, month + 1, 0);

        const daysInMonth = lastDayOfMonth.getDate();
        const startDay = firstDayOfMonth.getDay();

        let html = '<table>';
        html += '<caption>' + date.toLocaleString('default', { month: 'long', year: 'numeric' }) + '</caption>';
        html += '<thead><tr><th>Sun</th><th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th><th>Sat</th></tr></thead>';
        html += '<tbody><tr>';

        for (let i = 0; i < startDay; i++) {
            html += '<td></td>';
        }

        for (let day = 1; day <= daysInMonth; day++) {
            if ((startDay + day - 1) % 7 === 0 && day > 1) {
                html += '</tr><tr>';
            }

            const currentDate = new Date(year, month, day);
            const dateString = currentDate.toISOString().split('T')[0];
            const itemsForDay = foodItems.filter(item => item.date === dateString);
            const totalCalories = itemsForDay.reduce((sum, item) => sum + item.calories, 0);
            const uniqueCategories = [...new Set(itemsForDay.map(item => item.category))];

            html += `<td data-date="${dateString}">`;
            html += `<div class="day-number">${day}</div>`;
            if (itemsForDay.length > 0) {
                html += `<div class="calories">${totalCalories} kcal</div>`;
                html += '<div class="icons">';
                uniqueCategories.forEach(category => {
                    html += `<span>${categoryIcons[category] || ''}</span>`;
                });
                html += '</div>';
            }
            html += `</td>`;
        }

        html += '</tr></tbody></table>';
        calendarContainer.innerHTML = html;
    };

    const displayFoodItems = async (date) => {
        foodListContainer.innerHTML = '';
        const foodItems = await storage.get('foodItems') || [];

        foodItems.forEach((item, index) => {
            if (!date || item.date === date) {
                const foodItemElement = document.createElement('div');
                foodItemElement.setAttribute('data-id', index);
                foodItemElement.innerHTML = `
                    <strong>${item.name}</strong> - ${item.calories} calories (${item.category})
                    <button class="edit-btn" data-id="${index}">Edit</button>
                    <button class="delete-btn" data-id="${index}">Delete</button>
                `;
                foodListContainer.appendChild(foodItemElement);
            }
        });
    };

    addFoodForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const foodNameInput = document.getElementById('food-name');
        const caloriesInput = document.getElementById('calories');
        const categoryInput = document.getElementById('category');

        const foodItem = {
            name: foodNameInput.value,
            calories: parseInt(caloriesInput.value, 10),
            category: categoryInput.value,
            date: new Date().toISOString().split('T')[0]
        };

        let foodItems = await storage.get('foodItems') || [];
        foodItems.push(foodItem);

        await storage.save('foodItems', foodItems);

        foodNameInput.value = '';
        caloriesInput.value = '';
        categoryInput.value = 'fish';

        displayFoodItems(new Date().toISOString().split('T')[0]);
        renderCalendar(new Date());
    });

    calendarContainer.addEventListener('click', (event) => {
        const dayCell = event.target.closest('td');
        if (dayCell && dayCell.dataset.date) {
            displayFoodItems(dayCell.dataset.date);
        }
    });

    foodListContainer.addEventListener('click', async (event) => {
        if (event.target.classList.contains('delete-btn')) {
            const foodId = parseInt(event.target.getAttribute('data-id'), 10);
            let foodItems = await storage.get('foodItems') || [];
            const date = foodItems[foodId].date;
            foodItems.splice(foodId, 1);
            await storage.save('foodItems', foodItems);
            displayFoodItems(date);
            renderCalendar(new Date(date));
        } else if (event.target.classList.contains('edit-btn')) {
            const foodId = parseInt(event.target.getAttribute('data-id'), 10);
            let foodItems = await storage.get('foodItems') || [];
            const foodItem = foodItems[foodId];
            const foodItemElement = event.target.closest('div[data-id]');

            foodItemElement.innerHTML = `
                <input type="text" value="${foodItem.name}" class="edit-name">
                <input type="number" value="${foodItem.calories}" class="edit-calories">
                <select class="edit-category">
                    <option value="fish" ${foodItem.category === 'fish' ? 'selected' : ''}>Fish</option>
                    <option value="meat" ${foodItem.category === 'meat' ? 'selected' : ''}>Meat</option>
                    <option value="veggies" ${foodItem.category === 'veggies' ? 'selected' : ''}>Veggies</option>
                    <option value="sugar" ${foodItem.category === 'sugar' ? 'selected' : ''}>Sugar</option>
                    <option value="alcohol" ${foodItem.category === 'alcohol' ? 'selected' : ''}>Alcohol</option>
                </select>
                <button class="save-btn" data-id="${foodId}">Save</button>
                <button class="cancel-btn" data-id="${foodId}">Cancel</button>
            `;
        } else if (event.target.classList.contains('save-btn')) {
            const foodId = parseInt(event.target.getAttribute('data-id'), 10);
            const foodItemElement = event.target.closest('div[data-id]');
            const newName = foodItemElement.querySelector('.edit-name').value;
            const newCalories = parseInt(foodItemElement.querySelector('.edit-calories').value, 10);
            const newCategory = foodItemElement.querySelector('.edit-category').value;

            let foodItems = await storage.get('foodItems') || [];
            const date = foodItems[foodId].date;
            foodItems[foodId] = {
                name: newName,
                calories: newCalories,
                category: newCategory,
                date: date
            };

            await storage.save('foodItems', foodItems);
            displayFoodItems(date);
            renderCalendar(new Date(date));
        } else if (event.target.classList.contains('cancel-btn')) {
            const foodId = parseInt(event.target.getAttribute('data-id'), 10);
            let foodItems = await storage.get('foodItems') || [];
            const date = foodItems[foodId].date;
            displayFoodItems(date);
        }
    });

    renderCalendar(new Date());
    displayFoodItems(new Date().toISOString().split('T')[0]);
});
