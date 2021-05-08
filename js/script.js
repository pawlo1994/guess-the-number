{
    let maxNumberValue = 0;
    let chosenNumber = 0;
    let chancesLeftValue = 10;

    const setFocusOnUserNumber = (userNumber) => {
        userNumber.focus();
        userNumber.select();
    };

    const swapButton = (reset, chooseLevel) => {
        const checkButton = document.querySelector(".js-checkButton");
        checkButton.classList.toggle("section__button--hidden");
        reset.classList.toggle("section__button--hidden");
        chooseLevel.classList.toggle("section__button--hidden");
    };

    const swapSections = () => {
        const gameSection = document.querySelector(".js-gameSection");
        const chooseLevelSection = document.querySelector(".js-chooseLevelSection");
        chooseLevelSection.classList.toggle("section--hidden");
        gameSection.classList.toggle("section--hidden");
    };

    const chooseNumber = (max, userNumber, minNumber, maxNumber) => {
        userNumber.min = 1;
        minNumber.innerText = userNumber.min + "";
        maxNumberValue = max;
        userNumber.max = maxNumberValue;
        chosenNumber = Math.ceil(Math.random() * maxNumberValue);
        maxNumber.innerText = maxNumberValue + "";
    };

    const chooseLevel = (userNumber, minNumber, maxNumber) => {
        const chooseLevelElement = document.querySelector(".js-chooseLevel");
        switch (chooseLevelElement.value) {
            case "easy": {
                chooseNumber(200, userNumber, minNumber, maxNumber);
                break;
            }
            case "medium": {
                chooseNumber(500, userNumber, minNumber, maxNumber);
                break;
            } case "hard": {
                chooseNumber(1000, userNumber, minNumber, maxNumber);
                break;
            }
        };
        swapSections();
    };

    const assignChancesValue = (value) => {
        const chancesLeft = document.querySelector(".js-chancesLeft");
        chancesLeftValue = value;
        chancesLeft.innerText = chancesLeftValue + "";
        document.querySelector(".js-chancesLeft").innerText = chancesLeft.innerText;
    };

    const grabLive = () => {
        chancesLeftValue -= 1;
        assignChancesValue(chancesLeftValue);
    };

    const decreaseUserNumberMax = (userNumber, maxNumber) => {
        userNumber.max = +userNumber.value - 1;
        maxNumber.innerText = userNumber.max + "";
    };

    const increaseUserNumberMin = (userNumber, minNumber) => {
        userNumber.min = +userNumber.value + 1;
        minNumber.innerText = userNumber.min + "";
    };

    const showTip = (text, classRemove, classAdd, result) => {
        result.innerText = text;
        result.classList.remove(classRemove);
        result.classList.add(classAdd);
    };

    const onNumberToHighEvents = (userNumber, maxNumber, result) => {
        if ((+userNumber.value) > (+chosenNumber)) {
            grabLive();
            decreaseUserNumberMax(userNumber, maxNumber);
            showTip("too high!", "section__resultSpan--low", "section__resultSpan--high", result);
        };
    };

    const onNumberToLowEvents = (userNumber, minNumber, result) => {
        if ((+userNumber.value) < (+chosenNumber)) {
            grabLive();
            increaseUserNumberMin(userNumber, minNumber);
            showTip("too low!", "section__resultSpan--high", "section__resultSpan--low", result);
        };
    };

    const checkNumber = (userNumber, minNumber, maxNumber, result) => {
        onNumberToHighEvents(userNumber, maxNumber, result);
        onNumberToLowEvents(userNumber, minNumber, result);
    };

    const showResult = (text, result, resultParagraph, range, classAdd) => {
        result.innerText = text;
        resultParagraph.classList.add(classAdd);
        result.classList.remove("section__resultSpan--low");
        result.classList.remove("section__resultSpan--high");
        range.classList.toggle("section__paragraph--hidden");
        userNumber.disabled = true;
    };

    const onWinEvents = (result, resultParagraph, range, formSectionHeader, reset, chooseLevel) => {
        showResult("you win!!!", result, resultParagraph, range, "section__paragraph--resultGood");
        swapButton(reset, chooseLevel);
        formSectionHeader.classList.toggle("section__header--hidden");
    };

    const onLoseEvents = (loseText, result, resultParagraph, range, formSectionHeader, reset, chooseLevel) => {
        showResult(loseText, result, resultParagraph, range, "section__paragraph--resultBad");
        swapButton(reset, chooseLevel);
        formSectionHeader.classList.toggle("section__header--hidden");
    };

    const showWinOrLose = (reset, chooseLevel, result, resultParagraph, range, formSectionHeader) => {
        if ((+userNumber.value) === (+chosenNumber)) {
            onWinEvents(result, resultParagraph, range, formSectionHeader, reset, chooseLevel);
        }
        else if ((chancesLeftValue === 0) || (+userNumber.min === +userNumber.max)) {
            if (chancesLeftValue !== 0) {
                assignChancesValue(0);
                onLoseEvents(`Difference between min and max number equals 0!
                Game interrupted.
                Correct number is ${+chosenNumber}.`, result, resultParagraph, range, formSectionHeader, reset, chooseLevel);
            } else {
                onLoseEvents(`you lose!!!
                Correct number is ${+chosenNumber}.`, result, resultParagraph, range, formSectionHeader, reset, chooseLevel);
            };
        };
    };

    const hideResult = (result, resultParagraph, userNumber, range) => {
        result.innerText = "";
        result.classList.remove("section__resultSpan--low");
        result.classList.remove("section__resultSpan--high");
        resultParagraph.classList.remove("section__paragraph--resultGood");
        resultParagraph.classList.remove("section__paragraph--resultBad");
        range.classList.toggle("section__paragraph--hidden");
        userNumber.disabled = false;
    };

    const init = () => {
        const resetButton = document.querySelector(".js-resetButton");
        const chooseLevelButton = document.querySelector(".js-chooseLevelButton");
        const gameForm = document.querySelector(".js-gameForm");
        const levelForm = document.querySelector(".js-levelForm");
        const formSectionHeader = document.querySelector(".js-formSectionHeader");
        const minNumber = document.querySelector(".js-minNumber");
        const maxNumber = document.querySelector(".js-maxNumber");
        const userNumber = document.querySelector(".js-userNumber");
        const result = document.querySelector(".js-result");
        const resultParagraph = document.querySelector(".js-resultParagraph");
        const range = document.querySelector(".js-range");

        levelForm.addEventListener("submit", (event) => {
            event.preventDefault();
            chooseLevel(userNumber, minNumber, maxNumber);
            setFocusOnUserNumber(userNumber);
        });

        gameForm.addEventListener("submit", (event) => {
            event.preventDefault();
            setFocusOnUserNumber(userNumber);
            checkNumber(userNumber, minNumber, maxNumber, result);
            showWinOrLose(resetButton, chooseLevelButton, result, resultParagraph, range, formSectionHeader);
        });

        resetButton.addEventListener("click", () => {
            chooseNumber(maxNumberValue, userNumber, minNumber, maxNumber);
            assignChancesValue(10);
            hideResult(result, resultParagraph, userNumber, range);
            swapButton(resetButton, chooseLevelButton);
            formSectionHeader.classList.toggle("section__header--hidden");
            setFocusOnUserNumber(userNumber);
        });

        chooseLevelButton.addEventListener("click", () => {
            assignChancesValue(10);
            swapSections();
            hideResult(result, resultParagraph, userNumber, range);
            swapButton(resetButton, chooseLevelButton);
            formSectionHeader.classList.toggle("section__header--hidden");
        });
    };
    init();
}
