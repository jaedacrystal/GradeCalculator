import { animate, createDraggable, spring, splitText, stagger, utils, createAnimatable } from 'https://esm.sh/animejs';

/* Anime.js */

// Start Page Animations

// animate('.home-text', {
//     translateY: { from: '5vw', to: '0' },
//     duration: 1000,
//     opacity: [0, 1],
//     delay: 800,
// });

// animate('.calculator', {
//     translateY: { from: '5vw', to: '0' },
//     duration: 900,
//     delay: 2000,
//     opacity: [0, 1],
// });

/* Calculator */

$(document).ready(function(){
    $(".grade-calculator").hide();
    $(".footer-text").hide();
    $("#grades #equivalent").addClass("failed");
    $("#gwa #equivalent").addClass("failed");
    $("#overall #equivalent").addClass("failed");
    $("#gwa").hide();
    $("#overall").hide();
    $("#grade-table").hide();

    $("#start-button").click(function() {
        $(".calculator").hide().removeClass(".calculator");
        $(".grade-calculator").show();

        $(".description").text("click to see grade table").css(
            "cursor", "pointer"
        );

        $(".description").hover(function(){
            $(this).css("transition", "0.2s ease-out");
            $(this).css("color", "white");
            $(this).css("background-color", "#999B84");
        }, function(){
            $(this).css("background-color", "white");
            $(this).css("color", "#4F4F4F"); 
        });

        animate('.home-text', {
            translateY: { from: '0', to: '-10vw' },
            duration: 1000,
        });

        animate('.grade-calculator', {
            translateY: { from: '5vw', to: '0' },
            opacity: [0, 1],
            duration: 500,
            delay: 1000,
        });

        $(".footer-text").show();
        $("section").css(
            "overflowY", "auto",
        );

        $(".description").click(function() {
            $("#grade-table").toggle();

            animate('#grade-table', {
                translateY: { from: '2vw', to: '0' },
                opacity: [0, 1],
                duration: 300,
            });
        });
        
        $("#grade-table").css(
            "cursor", "pointer"
        ).click(function() {
            animate('#grade-table', {
                translateY: { from: '0', to: '2vw' },
                opacity: [1, 0],
                duration: 300,
            }).then(()=> {
                $("#grade-table").hide();
            });
        });
    });

    $(".delete img").mouseenter(function() {
        $(this).attr("src", "assets/img/delete-hover.svg");
    }).mouseleave(function(){   
        $(this).attr("src", "assets/img/delete.svg");
    });

    $(".delete").click(function() {
        var gradesRow = $(this).closest(".option-container");
        var gradesRowElement = gradesRow[0];

        var gwaRow = $(this).closest(".subject-container");
        var gwaRowElement = gwaRow[0];

        var overallRow = $(this).closest(".overall-subject-container");
        var overallRowElement = overallRow[0];
        
        if ($("#grades").is(':visible')) {
            if ($(".option-container").length > 1) {
                animate(gradesRowElement, {
                    opacity: [1, 0],
                    translateY: { from: '0', to: '-2vw' },
                    height: 0,
                    marginBottom: 0,
                    paddingTop: 0,
                    paddingBottom: 0,
                    duration: 300,
                    easing: "ease-out"
                }).then(() => {
                    gradesRow.remove();
                    $("#grades .calculate").click();
                });
            } else {
                $(".score, .total").val("");
                $("#grades .clear").click();
                animate("#grades #output, #grades #equivalent", {
                    transform: ["scale(0.9)", "scale(1)"],
                    opacity: [0, 1],
                    duration: 400
                });
            }
        }

        if ($("#gwa").is(':visible')) {
            if ($(".subject-container").length > 1) {
                animate(gwaRowElement, {
                    opacity: [1, 0],
                    translateY: { from: '0', to: '-2vw' },
                    height: 0,
                    marginBottom: 0,
                    paddingTop: 0,
                    paddingBottom: 0,
                    duration: 300,
                    easing: "ease-out"
                }).then(() => {
                    gwaRow.remove();
                    $("#gwa .calculate").click();
                });
            } else {
                $(".prelim, .midterm, .prefi, .finals").val("");
                $("#gwa .clear").click();
                animate("#gwa #output, #gwa #equivalent", {
                    transform: ["scale(0.9)", "scale(1)"],
                    opacity: [0, 1],
                    duration: 400
                });
            }
        }

        if ($("#overall").is(':visible')) {
            if ($(".overall-subject-container").length > 1) {
                animate(overallRowElement, {
                    opacity: [1, 0],
                    translateY: { from: '0', to: '-2vw' },
                    height: 0,
                    marginBottom: 0,
                    paddingTop: 0,
                    paddingBottom: 0,
                    duration: 300,
                    easing: "ease-out"
                }).then(() => {
                    overallRow.remove();
                    $("#overall .calculate").click();
                });
            } else {
                $(".grade").val("");
                $("#overall .clear").click();
                animate("#overall #output, #overall #equivalent", {
                    transform: ["scale(0.9)", "scale(1)"],
                    opacity: [0, 1],
                    duration: 400
                });
            }
        }
    });

    $("#grades .add-button").click(function() {
        var clonedDiv = $(".option-container:first").clone(true).insertAfter('.option-container:last');
        clonedDiv.find(".score, .total").val("");
        clonedDiv.find(".grade-option-selector").val("activity");

        animate(clonedDiv[0], {
            translateY: { from: '2vw', to: '0' },
            opacity: [0, 1],
            duration: 500,
        });
    });

    $("#gwa .add-button").click(function() {
        var clonedDiv = $(".subject-container:first").clone(true).insertAfter('.subject-container:last');
        clonedDiv.find(".prelim, .midterm, .prefi, .finals").val("");
        clonedDiv.find(".subject").val("");

        animate(clonedDiv[0], {
            translateY: { from: '2vw', to: '0' },
            opacity: [0, 1],
            duration: 500,
        });
    });

    $("#overall .add-button").click(function() {
        var clonedDiv = $(".overall-subject-container:first").clone(true).insertAfter('.overall-subject-container:last');
        clonedDiv.find(".grade").val("");
        clonedDiv.find(".subject").val("");

        animate(clonedDiv[0], {
            translateY: { from: '2vw', to: '0' },
            opacity: [0, 1],
            duration: 500,
        });
    });

    // Method Chooser

    $(".method-selector").change(function() {
        const selectedMethod = $(this).val();

        switch (selectedMethod) {
            case "grades":

                $("#grades").show();
                animate('#grades', {
                    opacity: [0, 1],
                    duration: 500,
                });

                $("#gwa").hide();
                $("#overall").hide();
                break;
            
            case "gwa":
                $("#gwa").show();
                animate('#gwa', {
                    opacity: [0, 1],
                    duration: 500,
                });
                
                $("#grades").hide();
                $("#overall").hide();
                break;

            case "overall-gwa":
                $("#overall").show();
                animate('#overall', {
                    opacity: [0, 1],
                    duration: 500,
                });

                $("#grades").hide();
                $("#gwa").hide();
                break;
        }
    })

    // Grade Calculator Logic

    const WEIGHTS = {
        activity: 0.20,
        ptask: 0.30,
        exam: 0.50
    }

    function convertGrade(grade) {
        let convertedGrade = 0.0;
        let remark = "";
        let theme = "";

        if (grade >= 97.50 && grade <= 100) {
            convertedGrade = 1.00;
            remark = "Excellent";
            theme = "excellent";
        } else if (grade >= 94.50 && grade < 97.50) {
            convertedGrade = 1.25;
            remark = "Very Good";
            theme = "very-good";
        } else if (grade >= 91.50 && grade < 94.50) {
            convertedGrade = 1.50;
            remark = "Very Good";
            theme = "very-good";
        } else if (grade >= 86.50 && grade < 91.50) {
            convertedGrade = 1.75;
            remark = "Very Good";
            theme = "very-good";
        } else if (grade >= 81.50 && grade < 86.50) {
            convertedGrade = 2.00;
            remark = "Satisfactory";
            theme = "satisfactory";
        } else if (grade >= 76.00 && grade < 81.50) {
            convertedGrade = 2.25;
            remark = "Satisfactory";
            theme = "satisfactory";
        } else if (grade >= 70.50 && grade < 76.00) {
            convertedGrade = 2.50;
            remark = "Satisfactory";
            theme = "satisfactory";
        } else if (grade >= 65.50 && grade < 70.50) {
            convertedGrade = 2.75;
            remark = "Fair";
            theme = "fair";
        } else if (grade >= 59.50 && grade < 65.50) {
            convertedGrade = 3.00;
            remark = "Fair";
            theme = "fair";
        } else if (grade <= 59.49) {
            convertedGrade = 5.00;
            remark = "Failed";
            theme = "failed";
        } else {
            console.error("An error occurred in grade conversion.");
            return { convertedGrade: "N/A", remark: "Error" };
        }

        return { 
            convertedGrade: convertedGrade.toFixed(2), 
            remark: remark,
            theme: theme
        };
    }

    $("#grades .calculate").on("click", function() {
        let categoryEarned = { activity: 0, ptask: 0, exam: 0 };
        let categoryTotal  = { activity: 0, ptask: 0, exam: 0 };
        let isValidationError = false;

        $(".option-container").each(function() {
            let type = $(this).find(".grade-option-selector").val();
            let score = parseFloat($(this).find(".score").val());
            let total = parseFloat($(this).find(".total").val());

            if (!isNaN(score) && !isNaN(total) && total > 0) {
                if (score > total) {
                    isValidationError = true;
                    return false;
                }

                categoryEarned[type] += score;
                categoryTotal[type] += total;
            }
        });

        if (isValidationError) {
            $("#grades #output").text("N/A");
            $("#grades #equivalent")
                .text("Error")
                .removeClass("excellent very-good satisfactory fair failed")
                .addClass("failed");

            animate("#grades #output, #grades #equivalent", {
                transform: ["scale(0.9)", "scale(1)"],
                opacity: [0, 1],
                duration: 300                                 
            });
            
            return;
        }

        let finalGrade = 0.0;
        let totalWeightUsed = 0.0;

        for (let key in WEIGHTS) {
            if (categoryTotal[key] > 0) {
                let categoryPercentage = (categoryEarned[key] / categoryTotal[key]) * 100;
                finalGrade += categoryPercentage * WEIGHTS[key];
                totalWeightUsed += WEIGHTS[key];
            }
        }

        if (totalWeightUsed > 0 && totalWeightUsed < 1) {
            finalGrade = finalGrade / totalWeightUsed;
        }

        if (totalWeightUsed > 0) {
            $("#grades #output").text(finalGrade.toFixed(2));

            let result = convertGrade(finalGrade);

            $("#grades #equivalent")
                .text(`${result.convertedGrade} (${result.remark})`)
                .removeClass("excellent very-good satisfactory fair failed")
                .addClass(result.theme);

            animate("#grades #output, #grades #equivalent", {
                transform: ["scale(0.9)", "scale(1)"],
                opacity: [0, 1],
                duration: 300                                 
            });
        } else {
            $("#grades #output").text("0.00");
            $("#grades #equivalent").text("5.00 (Failed)");

            animate("#output, #equivalent", {
                transform: ["scale(0.9)", "scale(1)"],
                opacity: [0, 1],
                duration: 400
            });
        }
    });

    $("#grades .clear").on("click", function() {
        $(".score, .total").val("");
        $("#grades #output").text("0.00");
        $("#grades #equivalent").text("5.00 (Failed)").removeClass("excellent very-good satisfactory fair failed").addClass("failed");
        
        animate("#grades #output, #grades #equivalent", {
            transform: ["scale(0.9)", "scale(1)"],
            opacity: [0, 1],
            duration: 400
        });
    });

    $("#grades").on("keydown", ".score, .total", function(event) {
        
        if (event.key === "Enter") {
            event.preventDefault();

            var allInputs = $("#grades").find(".score, .total");
            
            var currentIndex = allInputs.index(this);
            var nextIndex = currentIndex + 1;

            if (nextIndex < allInputs.length) {
                allInputs.eq(nextIndex).focus();
            } else {
                $("#grades .add-button").click();
                
                setTimeout(function() {
                    $(".option-container:last").find(".score").focus();
                }, 30); 
            }
        }
    });

    // GWA Per Subject Calculator Logic

    $("#gwa .calculate").on("click", function() {
        let isValidationError = false;
        let totalWeightedGradesSum = 0;
        let totalValidSubjectsCount = 0;

        $("#gwa .subject-container").each(function() {
            let prelim = parseFloat($(this).find(".prelim").val());
            let midterm = parseFloat($(this).find(".midterm").val());
            let prefi = parseFloat($(this).find(".prefi").val());
            let finals = parseFloat($(this).find(".finals").val());

            if (isNaN(prelim) && !isNaN(midterm) && isNaN(prefi) && isNaN(finals)) {
                return true;
            }

            let inputsArray = [prelim, midterm, prefi, finals];
            for (let i = 0; i < inputsArray.length; i++) {
                if (!isNaN(inputsArray[i]) && (inputsArray[i] < 0 || inputsArray[i] > 100)) {
                    isValidationError = true;
                    return false;
                }
            }

            if (!isNaN(prelim) && !isNaN(midterm) && !isNaN(prefi) && !isNaN(finals)) {
                let averageGrade = (prelim * 0.2) + (midterm * 0.2) + (prefi * 0.2) + (finals * 0.4);
                
                totalWeightedGradesSum += averageGrade;
                totalValidSubjectsCount++;
            }
        });

        if (isValidationError) {
            $("#gwa #output").text("N/A");
            $("#gwa #equivalent")
                .text("Error")
                .removeClass("excellent very-good satisfactory fair failed")
                .addClass("failed");

            animate("#gwa #output, #gwa #equivalent", {
                transform: ["scale(0.9)", "scale(1)"],
                opacity: [0, 1],
                duration: 300                                 
            });
            return;
        }

        if (totalValidSubjectsCount > 0) {
            let finalGWA = totalWeightedGradesSum / totalValidSubjectsCount;
            
            $("#gwa #output").text(finalGWA.toFixed(2));

            let result = convertGrade(finalGWA);

            $("#gwa #equivalent")
                .text(`${result.convertedGrade} (${result.remark})`)
                .removeClass("excellent very-good satisfactory fair failed")
                .addClass(result.theme);

            animate("#gwa #output, #gwa #equivalent", {
                transform: ["scale(0.9)", "scale(1)"],
                opacity: [0, 1],
                duration: 300                                 
            });
        } else {
            $("#gwa #output").text("0.00");
            $("#gwa #equivalent")
                .text("5.00 (Failed)")
                .removeClass("excellent very-good satisfactory fair failed")
                .addClass("failed");

            animate("#gwa #output, #gwa #equivalent", {
                transform: ["scale(0.9)", "scale(1)"],
                opacity: [0, 1],
                duration: 400
            });
        }
    });

    $("#gwa .clear").on("click", function() {
        $(".prelim, .midterm, .prefi, .finals").val("");
        $("#gwa #output").text("0.00");
        $("#gwa #equivalent").text("5.00 (Failed)").removeClass("excellent very-good satisfactory fair failed").addClass("failed");
        
        animate("#gwa #output, #gwa #equivalent", {
            transform: ["scale(0.9)", "scale(1)"],
            opacity: [0, 1],
            duration: 400
        });
    });

    $("#gwa").on("keydown", ".prelim, .midterm, .prefi, .finals", function(event) {
        
        if (event.key === "Enter") {
            event.preventDefault();

            var allInputs = $("#gwa").find(".prelim, .midterm, .prefi, .finals");
            
            var currentIndex = allInputs.index(this);
            var nextIndex = currentIndex + 1;

            if (nextIndex < allInputs.length) {
                allInputs.eq(nextIndex).focus();
            } else {
                $("#gwa .add-button").click();
                
                setTimeout(function() {
                    $(".subject-container:last").find(".prelim").focus();
                }, 30); 
            }
        }
    });

    // GWA Calculator Logic

    $("#overall .calculate").on("click", function() {
        let isValidationError = false;
        let totalWeightedGradesSum = 0;
        let totalValidSubjectsCount = 0;

        $("#overall .overall-subject-container").each(function() {
            let grade = parseFloat($(this).find(".grade").val());

            if (isNaN(grade)) {
                return true;
            }

            if (grade < 0 || grade > 100) {
                isValidationError = true;
                return false;
            }

                totalWeightedGradesSum += grade;
                totalValidSubjectsCount++;
            }
        );

        if (isValidationError) {
            $("#overall #output").text("N/A");
            $("#overall #equivalent")
                .text("Error")
                .removeClass("excellent very-good satisfactory fair failed")
                .addClass("failed");

            animate("#overall #output, #overall #equivalent", {
                transform: ["scale(0.9)", "scale(1)"],
                opacity: [0, 1],
                duration: 300                                 
            });
            return;
        }

        if (totalValidSubjectsCount > 0) {
            let finalGWA = totalWeightedGradesSum / totalValidSubjectsCount;
            
            $("#overall #output").text(finalGWA.toFixed(2));

            let result = convertGrade(finalGWA);

            $("#overall #equivalent")
                .text(`${result.convertedGrade} (${result.remark})`)
                .removeClass("excellent very-good satisfactory fair failed")
                .addClass(result.theme);

            animate("#overall #output, #overall #equivalent", {
                transform: ["scale(0.9)", "scale(1)"],
                opacity: [0, 1],
                duration: 300                                 
            });
        } else {
            $("#overall #output").text("0.00");
            $("#overall #equivalent")
                .text("5.00 (Failed)")
                .removeClass("excellent very-good satisfactory fair failed")
                .addClass("failed");

            animate("#overall #output, #overall #equivalent", {
                transform: ["scale(0.9)", "scale(1)"],
                opacity: [0, 1],
                duration: 400
            });
        }
    });

    $("#overall .clear").on("click", function() {
        $(".grade").val("");
        $("#overall #output").text("0.00");
        $("#overall #equivalent").text("5.00 (Failed)").removeClass("excellent very-good satisfactory fair failed").addClass("failed");
        
        animate("#overall #output, #overall #equivalent", {
            transform: ["scale(0.9)", "scale(1)"],
            opacity: [0, 1],
            duration: 400
        });
    });

    $("#overall").on("keydown", ".grade", function(event) {
        
        if (event.key === "Enter") {
            event.preventDefault();

            var allInputs = $("#overall").find(".grade");
            
            var currentIndex = allInputs.index(this);
            var nextIndex = currentIndex + 1;

            if (nextIndex < allInputs.length) {
                allInputs.eq(nextIndex).focus();
            } else {
                $("#overall .add-button").click();
                
                setTimeout(function() {
                    $(".overall-subject-container:last").find(".grade").focus();
                }, 30); 
            }
        }
    });
});

