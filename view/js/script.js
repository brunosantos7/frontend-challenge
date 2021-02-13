
jQuery(function() {

    let isAscending = undefined;

    $("#nameColumn").on("click", (function() { 

        let ordered = [];
        
        if(isAscending) {
            ordered = window.contactsList.sort((a, b) => {
                return a.name < b.name ? 1 : - 1;
            });

            isAscending = false;
        } else {
            ordered = window.contactsList.sort((a, b) => {
                return a.name > b.name ? 1 : - 1;
            });

            isAscending = true;
        }       

        window.contactsList = ordered;
        
        renderTable();
    }))

    $("#submit").on("click", function() {

        if(!isValidForm()) {                   
            $("#error").show();
            return;
        }

        const nameInput = $("#name");
        const emailInput = $("#email");
        const mobileInput = $("#mobile");

        window.contactsList.push(
            {
                name: nameInput.val(), 
                mobile: mobileInput.val(),
                email: emailInput.val()
            }
        );
       
        $("#error").hide();
        clearForm();
        renderTable();
    }) 

    $("#search").on("keyup", function () {
        const listFiltered = [];

        const filter = this.value;
        window.contactsList.filter(item => {
            if(item.mobile.includes(filter)) {
                listFiltered.push(item);
            }
        });

        renderTable(listFiltered);
    })

    function isValidForm() {
        const nameInput = $("#name");
        const emailInput = $("#email");
        const mobileInput = $("#mobile");

        /// empty inputs
        if(nameInput.val() === "" || emailInput.val() === "" || mobileInput.val() === "") {     
            return false;
        }

        /// contact name lengh greater than 20
        if(nameInput.val().length > 20) {
            return false;
        }

         /// mobile lengh greater than 10
         if(mobileInput.val().length > 10) {
            return false;
        }

        var regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if(!regex.test(emailInput.val())) {
            return false;
        }

        return true;
    }

    function clearForm() {
        const nameInput = $("#name");
        const emailInput = $("#email");
        const mobileInput = $("#mobile");

        nameInput.val('');
        emailInput.val('');
        mobileInput.val('');
    }

    function renderTable(listToRender = window.contactsList) {
        $("#summaryTable tbody").empty();     
        
        console.log(listToRender)

        if(listToRender.length > 0) {
            listToRender.forEach((element, index) => {
                $("#summaryTable tbody").append(
                    `<tr ${index % 2 === 0 ? 'style="background-color: #f2f2f2"' : ''} style="color: red'">
                        <td>${element.name}</td>
                        <td>${element.mobile}</td>
                        <td>${element.email}</td>
                    </tr>`
                )
            });

            $("#noResult").hide();
        } else {
           $("#noResult").show();
        }
        
    }
})


