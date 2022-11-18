var prompts = [
    {
        prompt: 'Did you find yourself attracted to men ?',
        weight: -1,
        class: 'group0'
    },
    {
        prompt: 'Are you attracted to girls ?',
        weight: -1,
        class: 'group1'
    },
    {
        prompt: 'Have you ever wanted to kiss a boy?',
        weight: -1,
        class: 'group2'
    },
    {
        prompt: 'Do you find yourself looking at boys more than girls?',
        weight: -1,
        class: 'group3'
    },
    {
        prompt: 'Ever Dream about boys in a sexual or a romantic way?',
        weight: -1,
        class: 'group4'
    },
    {
        prompt: 'Did you ever kiss a boy ?',
        weight: -1,
        class: 'group5'
    },
    {
        prompt: 'Do you see yourself dating a man in the future ?',
        weight: -1,
        class: 'group6'
    },
    {
        prompt: 'Do you support LGBTQ community ?',
        weight: -1,
        class: 'group7'
    },
    {
        prompt: 'What will your answer if a boy proposed you?',
        weight: -1,
        class: 'group8'
    },
    {
        prompt: 'Did you answer the question honestly ?',
        weight: -1,
        class: 'group9'
    }
    ]
  
    var prompt_values = [
    {
        value: 'YES', 
        class: 'btn-default btn-strongly-agree',
        weight: 5
    },
   
    {
        value: 'I have mixed feelings ', 
        class: 'btn-default',
        weight: 0
    },
   
    { 
        value: 'NO Not at all',
        class: 'btn-default btn-strongly-disagree',
        weight: -5
    }
    ]
    
    function createPromptItems() {
    
        for (var i = 0; i < prompts.length; i++) {
            var prompt_li = document.createElement('li');
            var prompt_p = document.createElement('p');
            var prompt_text = document.createTextNode(prompts[i].prompt);
    
            prompt_li.setAttribute('class', 'list-group-item prompt');
            prompt_p.appendChild(prompt_text);
            prompt_li.appendChild(prompt_p);
    
            document.getElementById('quiz').appendChild(prompt_li);
        }
    }
    function createValueButtons() {
        for (var li_index = 0; li_index < prompts.length; li_index++) {
            var group = document.createElement('div');
            group.className = 'btn-group btn-group-justified';
    
            for (var i = 0; i < prompt_values.length; i++) {
                var btn_group = document.createElement('div');
                btn_group.className = 'btn-group';
    
                var button = document.createElement('button');
                var button_text = document.createTextNode(prompt_values[i].value);
                button.className = 'group' + li_index + ' value-btn btn ' + prompt_values[i].class;
                button.appendChild(button_text);
    
                btn_group.appendChild(button);
                group.appendChild(btn_group);
    
                document.getElementsByClassName('prompt')[li_index].appendChild(group);
            }
        }
    }
    
    createPromptItems();
    createValueButtons();
 
    var total = 0;
    function findPromptWeight(prompts, group) {
        var weight = 0;
    
        for (var i = 0; i < prompts.length; i++) {
            if (prompts[i].class === group) {
                weight = prompts[i].weight;
            }
        }
    
        return weight;
    }
    
    function findValueWeight(values, value) {
        var weight = 0;
    
        for (var i = 0; i < values.length; i++) {
            if (values[i].value === value) {
                weight = values[i].weight;
            }
        }
    
        return weight;
    }
    
    
    $('.value-btn').mousedown(function () {
        var classList = $(this).attr('class');
        var classArr = classList.split(" ");
        var this_group = classArr[0];
      
        if($(this).hasClass('active')) {
            $(this).removeClass('active');
            total -= (findPromptWeight(prompts, this_group) * findValueWeight(prompt_values, $(this).text()));
        } else {
            total -= (findPromptWeight(prompts, this_group) * findValueWeight(prompt_values, $('.'+this_group+'.active').text()));
            $('.'+this_group).removeClass('active');
            $(this).addClass('active');
            total += (findPromptWeight(prompts, this_group) * findValueWeight(prompt_values, $(this).text()));
        }
    
        console.log(total);
    })
    
    
    
    $('#submit-btn').click(function () {
        
        $('.results').removeClass('hide');
        $('.results').addClass('show');
        
        if(total < 0) {
            document.getElementById('results').innerHTML = '<b style="text-decoration: underline;font-size: 4rem;letter-spacing: 7px;">Congratulations You are GAY ! </b> <br><br><br> <b style="color: #fb6b90;letter-spacing: 1px;font-size: 2rem;align-content: center;"> You may be homosexual, gay, or lesbian if you are attracted to people of the same sex as yourself.</b>';
        } else if(total > 0) {
            document.getElementById('results').innerHTML = '<b style="text-decoration: underline;font-size: 4rem;letter-spacing: 7px;">Congratulations You are STRAIGHT !</b> <br><br><br> <b style="color: #fb6b90;letter-spacing: 1px;font-size: 2rem;align-content: center;"> You may be heterosexual if you are attracted to people of the opposite sex as yourself. The word “straight” may be used to refer to heterosexual men and women.</b>';
        } else {
            document.getElementById('results').innerHTML = '<bstyle="text-decoration: underline;font-size: 4rem;letter-spacing: 7px;">Congratulations You are BISEXUAL ! </b> <br><br><br> <b style="color: #fb6b90;letter-spacing: 1px;font-size: 2rem;align-content: center;"> You may be bisexual if you are attracted to both sexes .<BR>You may be pansexual if you are attracted to people regardless of their sex, or gender. The word “queer” may be used to refer to pansexual men and women. This is sometimes called polysexuality or omnisexuality. <BR>You may be asexual if you are not attracted to either sex.</b>';
        }
    
        // Hide the quiz after they submit their results
        $('#quiz').addClass('hide');
        $('#submit-btn').addClass('hide');
        $('#retake-btn').removeClass('hide');
    })
    
    // Refresh the screen to show a new quiz if they click the retake quiz button
    $('#retake-btn').click(function () {
        $('#quiz').removeClass('hide');
        $('#submit-btn').removeClass('hide');
        $('#retake-btn').addClass('hide');
    
        $('.results').addClass('hide');
        $('.results').removeClass('show');
    })