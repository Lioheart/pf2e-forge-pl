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
        const screenButton = html.find('button[data-action="logout"]');
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

// Pod Escape
Hooks.on('renderApplication', (app, html) => {
    // Zmiana "Join Game As" na "Dołącz jako..."
    const joinAsButton = html.find('.menu-join-as h4');
    if (joinAsButton.length) {
        joinAsButton.text('Dołącz jako...');
    }

    // Zmiana "Back to The Forge" na "Powrót do Forge"
    const backToForgeButton = html.find('.menu-forge h4');
    if (backToForgeButton.length) {
        backToForgeButton.text('Powrót do Forge');
    }

    // Zmiana "Back to Join Screen" na "Powrót na ekran startowy"
    const backToScreenButton = html.find('.menu-logout h4');
    if (backToScreenButton.length) {
        backToScreenButton.text('Powrót na ekran startowy');
    }
});

// Hook nasłuchujący na rozpoczęcie walki
Hooks.on("combatStart", async (combat) => {
    // Pobierz listę uczestników posortowaną według inicjatywy
    const sortedCombatants = combat.combatants.contents.sort((a, b) => b.initiative - a.initiative);

    // Znajdź pierwszego uczestnika
    const firstCombatant = sortedCombatants[0];

    // Dane efektu na podstawie JSON-a
    const effectData = {
        name: "Przed turą",
        type: "effect",
        system: {
            description: {
                value: "<p>Nie możesz użyć reakcji, do momentu rozpoczęcia Twojej tury.</p>"
            },
            level: { value: 1 },
            duration: {
                value: 0,
                unit: "rounds",
                expiry: "turn-start",
                sustained: false
            },
            start: { value: 0, initiative: null },
            tokenIcon: { show: true }
        },
        img: "icons/svg/cancel.svg", // Ikona efektu
        flags: {
            exportSource: {
                world: "pf2e",
                system: "pf2e",
                coreVersion: "12.331",
                systemVersion: "6.7.0"
            }
        }
    };

    // Iteruj przez uczestników walki, pomijając pierwszego
    for (const combatant of sortedCombatants) {
        if (combatant === firstCombatant) continue; // Pomijamy pierwszego w kolejności

        const actor = combatant.actor;
        if (actor) {
            await actor.createEmbeddedDocuments("Item", [effectData]);
        }
    }
});
