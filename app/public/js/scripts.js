
function tell(data){
    document.getElementById('search-close').style.display = 'block';
    document.getElementById('search-open').style.display = 'none';
    var x = show();
    alert('Loading '+x);
}

function minimizewrapper(){

    var ele = document.getElementById('wrapper');
    ele.style.display = 'hidden';
}
function show(){
    return document.getElementById('demo').innerHTML;


}
