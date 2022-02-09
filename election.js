function abc(sdName){
    $.ajax({
        type:'GET',
        url:`https://hg0209.herokuapp.com/http://apis.data.go.kr/9760000/PolplcInfoInqireService2/getPrePolplcOtlnmapTrnsportInfoInqire?serviceKey=YBMG5%2Bn0%2BBzHMDovWv5PkkAFfLTrhvFMz9U4g7NJkbe68zlk99Y4Ko0xMV1joXoNe528Aygpcy1XgLIqLEXE%2FQ%3D%3D&pageNo=1&numOfRows=10&sgId=20220309&sdName=${sdName}`,
        dataType:'xml',
        beforeSend:function(){
            $('#content').append('<div class="loading"><i class="fas fa-spinner fa-spin"></i></div>')
        },
        complete:function(){
            $('#content .loading').remove()
        },
        success:function(getdata){
            console.log(getdata)
            usedata(getdata)
        },
        error:function(xhr){
            console.log(xhr.status + '/' + xhr.errorText) 
        }
    })
}
abc('서울특별시')

function usedata(data){
    $('#content .placeList').remove()
    var elem = `<ul class="placeList">`
    $(data).find('item').each(function(){
        var placeName = $(this).find('placeName').text()
        var addr = $(this).find('addr').text()
        elem += `<li>`
        elem += `<h3>${placeName}</h3>`
        elem += `<p>${addr}</p>`
        elem += `</li>`
    })
    elem += `</ul>`
    $('#content').append(elem)
}
$('#content .tabTit li').on('click', function(){
    var sido = $(this).text()
    $('#content .placeList').remove()
    abc(sido)
    return false
})