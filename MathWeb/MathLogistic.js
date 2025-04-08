
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("btnDemo").addEventListener("click", loadDemo)
});

function calculateMaclaurinExpression() {
    console.clear();

    let functionDisplayError = document.getElementById("functionDisplayError");
    let derivativeDisplay = document.getElementById("derivativeDisplay");
    let evaluationDisplay = document.getElementById("evaluationDisplay");
    let serieDisplay = document.getElementById("serieDisplay");
    let functionDisplay = document.getElementById("functionDisplay");

    functionDisplay.innerHTML = "";

    function clearFields() {
        if (functionDisplay.innerHTML) {
            functionDisplay.innerHTML = "";
        }

        if (evaluationDisplay.innerHTML) {
            evaluationDisplay.innerHTML = "";
        }

        while (derivativeDisplay.firstChild) {
            derivativeDisplay.removeChild(derivativeDisplay.firstChild);
        }

        while (evaluationDisplay.firstChild) {
            evaluationDisplay.removeChild(evaluationDisplay.firstChild);
        }

        while (serieDisplay.firstChild) {
            serieDisplay.removeChild(serieDisplay.firstChild);
        }
    }

    clearFields();

    let functionInput = document.getElementById("functionInput").value;
    let n = document.getElementById("nInput").value;

    if (functionInput.trim() === "" || n.trim() === "") {
        alert("Por favor, llene todos los campos presentes.");
        return;
    }

    let mainFunction;

    try {
        mainFunction = math.parse(functionInput);
    }
    catch (e) {
        functionDisplayError.innerHTML = "SYNTAX ERROR - The expression written is not supported by the calculator.";
        return;
    }

    let latex = `{f(x)} = ${mainFunction.toTex()}`;
    functionDisplay.innerHTML = latex;

    try {
        katex.render(latex, functionDisplay);
    }
    catch (e) {
        functionDisplayError.innerHTML = "SYNTAX ERROR - The expression written is not supported by the calculator.";
        clearFields();
        return;
    }

    try {
        latex = `{f(0)} = ${math.evaluate(String(mainFunction), { x:0 })}`;
    }
    catch (e) {
        functionDisplayError.innerHTML = "MATH ERROR - Is not possible to evaluate the written expression.";
        clearFields();
        return;
    }

    try {
        katex.render(latex, functionEvaluationDisplay);
    }
    catch (e) {
        functionDisplayError.innerHTML = "SYNTAX ERROR - The expression written is not supported by the calculator";
        clearFields();
        return;
    }

    let derivative;

    try {
        derivative = math.derivative(mainFunction, 'x');
    }
    catch (e) {
        functionDisplayError.innerHTML = "MATH ERROR - Is not possible to derivate the written expression.";
        clearFields();
        return;
    }

    let succession = "'";
    latex = `{f${succession}(x)} = ${mainFunction.toTex()} = ${derivative.toTex()}`;

    let derivativeBox = document.createElement("p");

    derivativeBox.innerHTML = latex;
    derivativeDisplay.appendChild(derivativeBox);
    katex.render(latex, derivativeBox);

    let evaluationBox = document.createElement("p");

    let derivativeEvaluation = math.evaluate(String(derivative), { x:0 });
    latex = `{f${succession}(0)} = ${derivativeEvaluation}`;
    
    evaluationBox.innerHTML = latex;
    evaluationDisplay.appendChild(evaluationBox);
    
    try {
        katex.render(latex, evaluationBox);
    }
    catch (e) {
        functionDisplayError.innerHTML = "SYNTAX ERROR - The expression written is not supported by the calculator.";
        clearFields();
        return;
    }

    let currentIteration = 1; // Mantener la cuenta de las iteraciones

    let MaclaurinBox = document.createElement("p");
    let MaclaurinSeries = "";
    MaclaurinSeries += `
        f(x) = ${math.evaluate(String(mainFunction), { x:0 })}
        +${derivativeEvaluation}x^{${currentIteration}}
    `;
    MaclaurinBox.innerHTML = MaclaurinSeries;

    try {
        katex.render(MaclaurinSeries, MaclaurinBox);
    }
    catch (e) {
        functionDisplayError.innerHTML = "SYNTAX ERROR - The expression written is not supported by the calculator.";
        clearFields();
        return;
    }

    function generateDerivatives() {
        if (currentIteration < n) {
            currentIteration++;
            succession += "'"; // Seguir con la siguiente derivada

            derivativeBox = document.createElement("p");
            latex = `
                {f${succession}(x)} = ${derivative.toTex()} = ${math.derivative(derivative, 'x').toTex()}
            `;
            derivative = math.derivative(derivative, 'x');
            derivativeBox.innerHTML = latex;
            derivativeDisplay.appendChild(derivativeBox);
            
            try {
                katex.render(latex, derivativeBox);
            }
            catch (e) {
                functionDisplayError.innerHTML = "SYNTAX ERROR - The expression written is not supported by the calculator.";
                clearFields();
                return;
            }

            evaluationBox = document.createElement("p");

            try {
                derivativeEvaluation = math.evaluate(String(derivative), { x:0 });
            }
            catch (e) {
                functionDisplayError.innerHTML = "MATH ERROR - Is not possible to derivate the written expression.";
                clearFields();
                return;
            }

            latex = `{f${succession}(0)} = ${derivativeEvaluation}`;
            evaluationBox.innerHTML = latex;
            evaluationDisplay.appendChild(evaluationBox);

            try {
                katex.render(latex, evaluationBox);
            }
            catch (e) {
                functionDisplayError.innerHTML = "SYNTAX ERROR - The expression written is not supported by the calculator.";
                clearFields();
                return;
            }

            MaclaurinSeries += `
                +\\frac{${derivativeEvaluation}x^{${currentIteration}}}
                {${currentIteration}!}
            `;
            MaclaurinBox.innerHTML = MaclaurinSeries;
            
            try {
                katex.render(MaclaurinSeries, MaclaurinBox);
            }
            catch (e) {
                functionDisplayError.innerHTML = "SYNTAX ERROR - The expression written is not supported by the calculator.";
                clearFields();
                return;
            }

            setTimeout(generateDerivatives, 100); // Margen de espera
        }
    }

    // Llamar a la función de generación de derivadas
    generateDerivatives();

    functionDisplay.style.visibility = "visible";
    derivativeDisplay.style.visibility = "visible";
    functionEvaluationDisplay.style.visibility = "visible";
    evaluationDisplay.style.visibility = "visible";
    serieDisplay.style.visibility = "visible";

    serieDisplay.appendChild(MaclaurinBox);
};

function calculateTaylorExpression() {
    console.clear();

    let functionDisplayError = document.getElementById("functionDisplayError");
    let derivativeDisplay = document.getElementById("derivativeDisplay");
    let evaluationDisplay = document.getElementById("evaluationDisplay");
    let serieDisplay = document.getElementById("serieDisplay");
    let functionDisplay = document.getElementById("functionDisplay");

    functionDisplay.innerHTML = "";

    function clearFields() {
        if (functionDisplay.innerHTML) {
            functionDisplay.innerHTML = "";
        }

        if (evaluationDisplay.innerHTML) {
            evaluationDisplay.innerHTML = "";
        }

        while (derivativeDisplay.firstChild) {
            derivativeDisplay.removeChild(derivativeDisplay.firstChild);
        }

        while (evaluationDisplay.firstChild) {
            evaluationDisplay.removeChild(evaluationDisplay.firstChild);
        }

        while (serieDisplay.firstChild) {
            serieDisplay.removeChild(serieDisplay.firstChild);
        }
    }

    clearFields();

    let functionInput = document.getElementById("functionInput").value;
    let n = document.getElementById("nInput").value;
    let a = document.getElementById("aInput").value;

    if (functionInput.trim() === "" || n.trim() === "" || a.trim() === "") {
        alert("Por favor, llene todos los campos presentes.");
        return;
    }

    let mainFunction;

    try {
        mainFunction = math.parse(functionInput);
    }
    catch (e) {
        functionDisplayError.innerHTML = "SYNTAX ERROR - The expression written is not supported by the calculator.";
        return;
    }

    let latex = `{f(x)} = ${mainFunction.toTex()}`;
    functionDisplay.innerHTML = latex;

    try {
        katex.render(latex, functionDisplay);
    }
    catch (e) {
        functionDisplayError.innerHTML = "SYNTAX ERROR - The expression written is not supported by the calculator.";
        clearFields();
        return;
    }

    try {
        latex = `{f(0)} = ${math.evaluate(String(mainFunction), { x:0 })}`;
    }
    catch (e) {
        functionDisplayError.innerHTML = "MATH ERROR - Is not possible to evaluate the written expression.";
        clearFields();
        return;
    }

    try {
        katex.render(latex, functionEvaluationDisplay);
    }
    catch (e) {
        functionDisplayError.innerHTML = "SYNTAX ERROR - The expression written is not supported by the calculator";
        clearFields();
        return;
    }

    let derivative;

    try {
        derivative = math.derivative(mainFunction, 'x');
    }
    catch (e) {
        functionDisplayError.innerHTML = "MATH ERROR - Is not possible to derivate the written expression.";
        clearFields();
        return;
    }

    let succession = "'";
    latex = `{f${succession}(x)} = ${mainFunction.toTex()} = ${derivative.toTex()}`;

    let derivativeBox = document.createElement("p");

    derivativeBox.innerHTML = latex;
    derivativeDisplay.appendChild(derivativeBox);
    katex.render(latex, derivativeBox);

    let evaluationBox = document.createElement("p");

    let derivativeEvaluation = math.evaluate(String(derivative), { x:0 });
    latex = `{f${succession}(0)} = ${derivativeEvaluation}`;
    
    evaluationBox.innerHTML = latex;
    evaluationDisplay.appendChild(evaluationBox);
    
    try {
        katex.render(latex, evaluationBox);
    }
    catch (e) {
        functionDisplayError.innerHTML = "SYNTAX ERROR - The expression written is not supported by the calculator.";
        clearFields();
        return;
    }

    let currentIteration = 1; // Mantener la cuenta de las iteraciones

    let TaylorBox = document.createElement("p");
    let TaylorSeries = "";
    TaylorSeries += `
        f(x) = ${math.evaluate(String(mainFunction), { x:0 })}
        +${derivativeEvaluation}(x-${a})^{${currentIteration}}
    `;
    TaylorBox.innerHTML = TaylorSeries;

    try {
        katex.render(TaylorSeries, TaylorBox);
    }
    catch (e) {
        functionDisplayError.innerHTML = "SYNTAX ERROR - The expression written is not supported by the calculator.";
        clearFields();
        return;
    }

    function generateDerivatives() {
        if (currentIteration < n) {
            currentIteration++;
            succession += "'"; // Seguir con la siguiente derivada

            derivativeBox = document.createElement("p");
            latex = `
                {f${succession}(x)} = ${derivative.toTex()} = ${math.derivative(derivative, 'x').toTex()}
            `;
            derivative = math.derivative(derivative, 'x');
            derivativeBox.innerHTML = latex;
            derivativeDisplay.appendChild(derivativeBox);
            
            try {
                katex.render(latex, derivativeBox);
            }
            catch (e) {
                functionDisplayError.innerHTML = "SYNTAX ERROR - The expression written is not supported by the calculator.";
                clearFields();
                return;
            }

            evaluationBox = document.createElement("p");

            try {
                derivativeEvaluation = math.evaluate(String(derivative), { x:0 });
            }
            catch (e) {
                functionDisplayError.innerHTML = "MATH ERROR - Is not possible to derivate the written expression.";
                clearFields();
                return;
            }

            latex = `{f${succession}(0)} = ${derivativeEvaluation}`;
            evaluationBox.innerHTML = latex;
            evaluationDisplay.appendChild(evaluationBox);

            try {
                katex.render(latex, evaluationBox);
            }
            catch (e) {
                functionDisplayError.innerHTML = "SYNTAX ERROR - The expression written is not supported by the calculator.";
                clearFields();
                return;
            }

            TaylorSeries += `
                +\\frac{${derivativeEvaluation}(x-${a})^{${currentIteration}}}
                {${currentIteration}!}
            `;
            TaylorBox.innerHTML = TaylorSeries;
            
            try {
                katex.render(TaylorSeries, TaylorBox);
            }
            catch (e) {
                functionDisplayError.innerHTML = "SYNTAX ERROR - The expression written is not supported by the calculator.";
                clearFields();
                return;
            }

            setTimeout(generateDerivatives, 100); // Margen de espera
        }
    }

    // Llamar a la función de generación de derivadas
    generateDerivatives();

    functionDisplay.style.visibility = "visible";
    derivativeDisplay.style.visibility = "visible";
    functionEvaluationDisplay.style.visibility = "visible";
    evaluationDisplay.style.visibility = "visible";
    serieDisplay.style.visibility = "visible";

    serieDisplay.appendChild(TaylorBox);
};

function loadDemo() {
    if (document.getElementById("mathForm")) {
        return;
    }

    const form = document.createElement("form");
    form.id = "mathForm";
    form.method = "POST";

    const a = document.createElement("input");
    a.type = "text";
    a.id = "aInput";
    a.placeholder = "a=cos(x)/2";

    const n = document.createElement("input");
    n.type = "text";
    n.id = "nInput";
    n.placeholder = "n=5";

    const input = document.createElement("input");
    input.type = "text";
    input.id = "functionInput";
    input.placeholder = "f(x)=sin(x)/tan(x)*e";

    const buttonMaclaurin = document.createElement("button");
    buttonMaclaurin.type = "submit";
    buttonMaclaurin.id = "btnMaclaurin";
    buttonMaclaurin.textContent = "Calcular Maclaurin";

    const buttonTaylor = document.createElement("button");
    buttonTaylor.type = "submit";
    buttonTaylor.id = "btnTaylor";
    buttonTaylor.textContent = "Calcular Taylor";

    form.appendChild(a);
    form.appendChild(n);
    form.appendChild(input);
    form.appendChild(buttonMaclaurin);
    form.appendChild(buttonTaylor);

    const errorDiv = document.createElement("div");
    errorDiv.id = "functionDisplayError";

    const calcBox = document.createElement("div");
    calcBox.id = "MaclaurinCalcBx";

    const functionDisplay = document.createElement("div");
    functionDisplay.id = "functionDisplay";

    const derivativeDisplay = document.createElement("div");
    derivativeDisplay.id = "derivativeDisplay";

    const functionEvaluationDisplay = document.createElement("div");
    functionEvaluationDisplay.id = "functionEvaluationDisplay";

    const evaluationDisplay = document.createElement("div");
    evaluationDisplay.id = "evaluationDisplay";

    const serieDisplay = document.createElement("div");
    serieDisplay.id = "serieDisplay";

    input.addEventListener("input", (e) => {
        let functionDisplayError = document.getElementById("functionDisplayError");
        functionDisplayError.innerHTML = "";
    });

    calcBox.appendChild(functionDisplay);
    calcBox.appendChild(derivativeDisplay);
    calcBox.appendChild(functionEvaluationDisplay);
    calcBox.appendChild(evaluationDisplay);
    calcBox.appendChild(serieDisplay);

    document.getElementById("Field").appendChild(form);
    document.getElementById("mathContainer").appendChild(errorDiv);
    document.getElementById("mathContainer").appendChild(calcBox);

    document.getElementById("mathForm").addEventListener("submit", (e) => {
        e.preventDefault();

        const buttonPressed = e.submitter;

        if (buttonPressed.id === "btnMaclaurin") {
            calculateMaclaurinExpression();
        }
        else if (buttonPressed.id === "btnTaylor") {
            calculateTaylorExpression();
        }
    });
};