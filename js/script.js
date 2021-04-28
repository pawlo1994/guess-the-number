{
    const minNumber = document.querySelector(".js-minNumber");
    const maxNumber = document.querySelector(".js-maxNumber");
    const userNumber = document.querySelector(".js-userNumber");
    const chancesLeft = document.querySelector(".js-chancesLeft");
    const result = document.querySelector(".js-result");
    const resultParagraph = document.querySelector(".js-resultParagraph");
    const range = document.querySelector(".js-range");
    const formSectionHeader = document.querySelector(".js-formSectionHeader");

    let maxNumberValue = 0;
    let chosenNumber = 0;
    let chancesLeftValue = 10;


    const assignChancesValue = (value) => {
        chancesLeftValue = value;
        chancesLeft.innerText = chancesLeftValue + "";
        document.querySelector(".js-chancesLeft").innerText = chancesLeft.innerText;
    };

    const setFocusOnUserNumber = () => {
        userNumber.focus();
        userNumber.select();
    };

    const grabLive = () => {
        chancesLeftValue -= 1;
        chancesLeft.innerText = chancesLeftValue + "";
        document.querySelector(".js-chancesLeft").innerText = chancesLeft.innerText;
    };

    const swapButton = (reset, chooseLevel) => {
        const checkButton = document.querySelector(".js-checkButton");
        checkButton.classList.toggle("section__button--hidden");
        reset.classList.toggle("section__button--hidden");
        chooseLevel.classList.toggle("section__button--hidden");
    };

    const chooseNumber = (max) => {
        userNumber.min = 1;
        minNumber.innerText = userNumber.min + "";
        maxNumberValue = max;
        userNumber.max = maxNumberValue;
        chosenNumber = Math.ceil(Math.random() * maxNumberValue);
        maxNumber.innerText = maxNumberValue + "";
    };

    const swapSections = () => {
        const gameSection = document.querySelector(".js-gameSection");
        const chooseLevelSection = document.querySelector(".js-chooseLevelSection");
        chooseLevelSection.classList.toggle("section--hidden");
        gameSection.classList.toggle("section--hidden");
    };

    const chooseLevel = () => {
        const chooseLevelElement = document.querySelector(".js-chooseLevel");
        switch (chooseLevelElement.value) {
            case "easy": {
                chooseNumber(200);
                break;
            }
            case "medium": {
                chooseNumber(500);
                break;
            } case "hard": {
                chooseNumber(1000);
                break;
            }
        };
        swapSections();
    };

    const decreaseUserNumberMax = () => {
        userNumber.max = +userNumber.value - 1;
        maxNumber.innerText = userNumber.max + "";
    };

    const increaseUserNumberMin = () => {
        userNumber.min = +userNumber.value + 1;
        minNumber.innerText = userNumber.min + "";
    };

    const showTip = (text, classRemove, classAdd) => {
        result.innerText = text;
        result.classList.remove(classRemove);
        result.classList.add(classAdd);
    };

    const checkNumber = () => {
        if ((+userNumber.value) > (+chosenNumber)) {
            decreaseUserNumberMax();
            grabLive();
            showTip("too high!", "section__resultSpan--low", "section__resultSpan--high");
        } else if ((+userNumber.value) < (+chosenNumber)) {
            increaseUserNumberMin();
            grabLive();
            showTip("too low!", "section__resultSpan--high", "section__resultSpan--low");
        };
    };

    const showResult = (text, element1, element2, classAdd) => {
        element1.innerText = text;
        element2.classList.add(classAdd);
        element1.classList.remove("section__resultSpan--low");
        element1.classList.remove("section__resultSpan--High");
        range.classList.toggle("section__paragraph--hidden");
        userNumber.disabled = true;
    };

    const showWinOrLose = (reset, chooseLevel) => {
        if ((+userNumber.value) === (+chosenNumber)) {
            showResult("you win!!!", result, resultParagraph, "section__paragraph--resultGood");
            swapButton(reset, chooseLevel);
            formSectionHeader.classList.toggle("section__header--hidden");
        }
        else if ((chancesLeftValue === 0) || (+userNumber.min === +userNumber.max)) {
            if (chancesLeftValue !== 0) {
                assignChancesValue(0);
                showResult(`Difference between min and max number equals 0!
                Game interrupted.
                Correct number is ${+chosenNumber}.`, result, resultParagraph, "section__paragraph--resultBad");
                swapButton(reset, chooseLevel);
                formSectionHeader.classList.toggle("section__header--hidden");
            } else {
                showResult(`you lose!!!
                Correct number is ${+chosenNumber}.`, result, resultParagraph, "section__paragraph--resultBad");
                swapButton(reset, chooseLevel);
                formSectionHeader.classList.toggle("section__header--hidden");
            };
        };
    };

    const hideResult = () => {
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

        levelForm.addEventListener("submit", (event) => {
            event.preventDefault();
            chooseLevel();
            setFocusOnUserNumber();
        });

        gameForm.addEventListener("submit", (event) => {
            event.preventDefault();
            setFocusOnUserNumber();
            checkNumber();
            showWinOrLose(resetButton, chooseLevelButton);
        });

        resetButton.addEventListener("click", () => {
            chooseNumber(maxNumberValue);
            assignChancesValue(10);
            hideResult();
            swapButton(resetButton, chooseLevelButton);
            formSectionHeader.classList.toggle("section__header--hidden");
            setFocusOnUserNumber();
        });

        chooseLevelButton.addEventListener("click", () => {
            assignChancesValue(10);
            swapSections();
            hideResult();
            swapButton(resetButton, chooseLevelButton);
            formSectionHeader.classList.toggle("section__header--hidden");
        });
    };
    init();
}
