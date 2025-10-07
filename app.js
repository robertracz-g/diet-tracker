document.addEventListener('DOMContentLoaded', () => {
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
        const itemsToDisplay = date ? foodItems.filter(item => item.date === date) : [];

        itemsToDisplay.forEach(item => {
            const foodItemElement = document.createElement('div');
            foodItemElement.innerHTML = `
                <strong>${item.name}</strong> - ${item.calories} calories (${item.category})
            `;
            foodListContainer.appendChild(foodItemElement);
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

    renderCalendar(new Date());
    displayFoodItems(new Date().toISOString().split('T')[0]);
});
