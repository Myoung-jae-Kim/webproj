/*global $:false */
/*global _:false */
/*jslint browser:true, devel: true */
$(document).ready(function(){
  $(".btn-primary").click(function(e) {
    $(e.currentTarget).hide();
    $(".btn-success").show();
  });

  $(".create").click(function() {
    console.log("click");
    if($(".survey-options").children("option:selected").text() === "객관식") {
      $("ol").append("<div class='choice'><li><span><input type='text'></span><div><input type='radio' id='select' name='select' value='1'> <input type='text'><br><input type='radio' id='select' name='select' value='2'> <input type='text'><br><input type='radio' id='select' name='select' value='3'> <input type='text'><br><input type='radio' id='select' name='select' value='4'> <input type='text'><br><input type='radio' id='select' name='select' value='5'> <input type='text'><br><input type='radio' id='select' name='select' value='6'> 기타<input type='text'></div></li></div><br>");
    } else if($(".survey-options").children("option:selected").text() === "텍스트") {
      $("ol").append("<div class='text'><li><span><input type='text'></input></span><div><input class='form-control' type='text'></input></div></li></div><br>");
    } else if($(".survey-options").children("option:selected").text() === "단락텍스트"){
      $("ol").append("<div class='longtext'><li><span><input type='text'></input></span><br><div><textarea class='form-control' rows='10' placeholder='긴의견'></textarea></div></li></div><br>");
    } else {
      $("ol").append("<div class='point'><li><span><input type='text'></span><div><input type='radio' id='select' name='select' value='1'> 1점<br><input type='radio' id='select' name='select' value='2'> 2점<br><input type='radio' id='select' name='select' value='3'> 3점<br><input type='radio' id='select' name='select' value='4'> 4점<br><input type='radio' id='select' name='select' value='5'> 5점<br></div></li></div><br>");
    }
  });

 // $("div").each(function() {
 //   if($("div").hasClass("choice")) {
 //    var choice = $(".choice").serializeArray();
 //    console.log(choice);
 //  } else if($("div").hasClass("text")) {
 //    var text = $(".text").serializeArray();
 //    console.log(text);
 //  } else if($("div").hasClass("longtext")) {
 //    var longtext = $(".longtext").serializeArray();
 //    console.log(longtext);
 //  }
 // });
});
