// Przyciski Forge na zakładce Ustawienia
Hooks.on('renderSettings', (app, html, data) => {
    setTimeout(() => {
        // Zmiana "Join Game As" na "Dołącz jako..."
        const joinButton = html.find('button[data-action="join-as"]');
        if (joinButton.length) {
            joinButton.html('<i class="fas fa-random"></i> Dołącz jako...');
        }

        // Zmiana "Back to The Forge" na "Powrót do Forge"
        const forgeButton = html.find('button[data-action="forgevtt"]');
        if (forgeButton.length) {
            forgeButton.html('<i class="fas fa-home"></i> Powrót do Forge');
        }

        // Zmiana "Back to Join Screen" na "Powrót na ekran startowy"
        const screenButton = html.find('button[data-action="forgevtt"]');
        if (screenButton.length) {
            screenButton.html('<i class="fas fa-door-closed"></i> Powrót na ekran startowy');
        }
    }, 500); // Czas opóźnienia, który można dostosować
    console.log('Załadowano moduł niestandardowy!');
});



// Okno Dołącz jako tymczasowy gracz
Hooks.on('renderDialog', (app, html, data) => {
    // Zmiana "Join Game As" na "Dołącz jako gracz"
    const title = html.find('.window-title');
    if (title.length && title.text().includes('Join Game As')) {
        title.text('Dołącz jako gracz');
    }

    // Zmiana "Select a player to re-join the game as :" na "Wybierz gracza, aby dołączyć tymczasowo jako gracz do gry:"
    const selectPlayerText = html.find('p');
    if (selectPlayerText.length && selectPlayerText.text().includes('Select a player to re-join the game as')) {
        selectPlayerText.text('Wybierz gracza, aby dołączyć tymczasowo jako gracz do gry:');
    }

    // Zmiana "As Temporary Player" na "Jako gracz tymczasowy"
    const tempPlayerButtons = html.find('button[data-join-as="temp"]');
    tempPlayerButtons.each(function () {
        const buttonText = $(this).html();
        $(this).html(buttonText.replace('As Temporary Player', 'Jako gracz tymczasowy'));
    });
});