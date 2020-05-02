var equation = document.getElementById('equation');
var screen = document.getElementById('actual_number');


var k1 = document.getElementById('k1');
var k2 = document.getElementById('k2');
var k3 = document.getElementById('k3');
var k4 = document.getElementById('k4');
var k5 = document.getElementById('k5');
var k6 = document.getElementById('k6');
var k7 = document.getElementById('k7');
var k8 = document.getElementById('k8');
var k9 = document.getElementById('k9');
var k0 = document.getElementById('k0');
var kc = document.getElementById('k.');
var ka = document.getElementById('k+');
var ks = document.getElementById('k-');
var kd = document.getElementById('k/');
var km = document.getElementById('k*');
var ke = document.getElementById('k=');

k1.addEventListener("click", function(){write(1)});
k2.addEventListener("click", function(){write(2)});
k3.addEventListener("click", function(){write(3)});
k4.addEventListener("click", function(){write(4)});
k5.addEventListener("click", function(){write(5)});
k6.addEventListener("click", function(){write(6)});
k7.addEventListener("click", function(){write(7)});
k8.addEventListener("click", function(){write(8)});
k9.addEventListener("click", function(){write(9)});
k0.addEventListener("click", function(){write(0)});
kc.addEventListener("click", function(){write('.')});
ka.addEventListener("click", function(){addition()});
ks.addEventListener("click", function(){subtraction()});
kd.addEventListener("click", function(){division()});
km.addEventListener("click", function(){multiplication()});
ke.addEventListener("click", function(){equal()});

var show_number = "";
var communique = 0;
function write(nr)
{
    if(show_number.length<22)
    {
        show_number +=nr;
        screen.innerHTML=show_number;
    }
    else
    {
        equation.innerHTML=communique;
    }
}

function communicate(number,sign)
{
    number = parseFloat(number);
    if(communique != 0)
    {
        communique = communique  + number+ sign;
    }
    else
    {
        communique = number+ sign ;
    }
    //alert(communique);
    return communique;
}


//Calculate (main functions)

function equal()
{
    //fetch equation to calculate
    var string_to_calculate=equation.innerHTML+screen.innerHTML ;
    equation.innerHTML+=screen.innerHTML+"=";

    //Calculate
    var calc_table = createTable(string_to_calculate);
    //performing multiplication
    var tab_to_add=[];
    var counter=0;
    //used to skip second number to multiplication or division
    var second_number = false;
    for(i=0; i<calc_table.length;i++)
    {

        if(calc_table[i]=="*")
        {
            counter--;
            tab_to_add[counter]=calc_table[i-1]*calc_table[i+1];
            calc_table[i+1]=calc_table[i-1]*calc_table[i+1];
            counter++;
            second_number = true;
        }
        else if(calc_table[i]=="/")
        {
            counter--;
            tab_to_add[counter]=calc_table[i-1]/calc_table[i+1];
            calc_table[i+1]=calc_table[i-1]/calc_table[i+1];
            counter++;
            second_number = true;
        }
        else if(second_number == false)
        {
            tab_to_add[counter]=calc_table[i]; counter++;
        }
        else
        {
            second_number = false;
        }
    }
    //performing addition
    for(i=0; i<tab_to_add.length;i++)
    {
        if(tab_to_add[i]=="+")
        {
            tab_to_add[i+1]=tab_to_add[i-1]+tab_to_add[i+1];
        }
        else if(tab_to_add[i]=="-")
        {
            tab_to_add[i+1]=tab_to_add[i-1]-tab_to_add[i+1];
        }
    }
    var result=tab_to_add[tab_to_add.length-1];

    //check if number is float
    var after_dot = result*100 - Math.round(result*100);

    if(after_dot != 0){ result= result.toFixed(2);}

    ///////////////////////////Write final result///////////////////////////////////
    screen.innerHTML = result;
}


///////////////////Create table to calculate////////////////////
function createTable(equal_string)
{
    //create main table
    var tab_number = [];
    //countering table cells
    var counter=0;
    //checks if the number has a continuation
    var beginning_of_number = true;

    // separation string to table
    for(i=0;i<equal_string.length;i++)
    {
        switch(equal_string.charAt(i))
        {
            case '+':tab_number[counter]='+';counter++;break;
            case '-':tab_number[counter]='-';counter++;break;
            case '*':tab_number[counter]='*';counter++;break;
            case '/':tab_number[counter]='/';counter++;break;
            default:
                if(beginning_of_number)tab_number[counter]=0;
                tab_number[counter]=tab_number[counter]+equal_string.charAt(i);beginning_of_number = false;
                if(equal_string.charAt(i+1)=="+"||equal_string.charAt(i+1)=="-"||equal_string.charAt(i+1)=="*"||equal_string.charAt(i+1)=="/"||equal_string.charAt(i+1)=="")
                {
                    tab_number[counter] = parseFloat(tab_number[counter]);
                    counter++;
                    beginning_of_number = true;
                }
            break;
        }
    }

    return tab_number;
}

/////////////////////////////////////////////////Prepair string to create table////////////////
function addition()
{
    if(show_number.length>0)
    {
        show_number = parseFloat(show_number)
        equation.innerHTML=communicate(show_number, "+");
        show_number="";
    }
    else
    {
        equation.innerHTML="Write some number";
    }
}

function subtraction()
{
    if(show_number.length>0)
    {
        show_number = parseFloat(show_number)
        equation.innerHTML=communicate(show_number, "-");
        show_number="";
    }
    else
    {
        equation.innerHTML="Write some number";
    }
}
function multiplication()
{
    if(show_number.length>0)
    {
        show_number = parseFloat(show_number)
        equation.innerHTML=communicate(show_number, "*");
        show_number="";
    }
    else
    {
        equation.innerHTML="Write some number";
    }
}
function division()
{
    if(show_number.length>0)
    {
        show_number = parseFloat(show_number)
        equation.innerHTML=communicate(show_number, "/");
        show_number="";
    }
    else
    {
        equation.innerHTML="Write some number";
    }
}