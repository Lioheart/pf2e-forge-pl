// Przyciski Forge na zakładce Ustawienia
Hooks.on('renderSettings', (app, html, data) => {
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
});


// Okno Dołącz jako tymczasowy gracz
Hooks.on('renderJoinGameDialog', (app, html, data) => {
    // Tłumaczenie "Join Game As"
    const title = html.find('h4.window-title');
    if (title.length) {
        title[0].innerHTML("Dołącz jako");
    }

    // Tłumaczenie "Select a player to re-join the game as:"
    const selectText = html.find('.dialog-content p');
    if (selectText.length) {
        selectText[0].innerHTML("Wybierz gracza, aby dołączyć tymczasowo jako gracz do gry:");
    }

    // Tłumaczenie "As Temporary Player"
    const buttons = html.find('button[data-join-as="temp"]');
    buttons.each(function () {
        let buttonText = $(this).text();
        $(this).text(buttonText.replace("As Temporary Player", "Jako tymczasowy gracz"));
    });
});

