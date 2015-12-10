/*global $:false */
/*global _:false */
/*jslint browser:true, devel: true */
  $(".btn-primary").click(function(e) {
    $(e.currentTarget).hide();
    $(".btn-success").show();
  });

  $(".create").click(function() {
    if($(".survey-options").children("option:selected").text() === "객관식") {
      $("ol").append("<li class='choice'><span><input type='text'></span><form><input type='radio' name='select' value='1'> <input type='text'><br><input type='radio' name='select' value='2'> <input type='text'><br><input type='radio' name='select' value='3'> <input type='text'><br><input type='radio' name='select' value='4'> <input type='text'><br><input type='radio' name='select' value='5'> <input type='text'><br><input type='radio' name='select' value='6'> 기타<input type='text'></form></li><br>");
    } else if($(".survey-options").children("option:selected").text() === "텍스트") {
      $("ol").append("<li class='text'><span><input type='text'></input></span><div><input class='form-control' type='text'></input></div></li><br>");
    } else {
      $("ol").append("<li class='longtext'><span><input type='text'></input></span><br><div><textarea class='form-control' rows='10' placeholder='긴의견'></textarea></div></li><br>");
    }
  });

 $("li").each(function() {
   if($("li").hasClass("choice")) {
    $("li").serializeArray();
    console.log(this);
  } else if($("li").hasClass("text")) {
    $("li").serializeArray();
    console.log(this);
  } else if($("li").hasClass("longtext")) {
    $("li").serializeArray();
    console.log(this);
  }
 });
