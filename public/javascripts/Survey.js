/*global $:false */
/*global _:false */
/*jslint browser:true, devel: true */
var ListController = function() {
  function setAjaxHandler() {
    $( document ).ajaxStart(function() {
      $("#main").addClass("loading");
    }).ajaxStop(function() {
      $("#main").removeClass("loading");
    });
  }

  function checked(type, value) {
    var e = $("." + type + " .option[data-value='" + value + "']");
    return e.hasClass('selected');
  }

  var Constructor = function () {
    var self = this;
    setAjaxHandler();
    this.listTemplate = _.template($("#list-template").html());
    this.load();
    $("#post-list").click(function() {
      self.postList();
    }.bind(this));
    $("section.options a.option")
    .addClass('selected')
    .click(function(e) {
      $(e.currentTarget).toggleClass('selected');
      self.render();
    });

    $("section.options a.all").click(function(e) {
      var section = $($(e.currentTarget).closest('section'));
      var options = section.find('.option');
      if (options.length === section.find('.option.selected').length) {
        options.removeClass('selected');
      } else {
        options.addClass('selected');
      }
      self.render();
    });
  };

  Constructor.prototype._visible = function(list) {
    if (!checked('done', list.done)) {
      return false;
    }
    if (!checked('priority', list.priority)) {
      return false;
    }
    if (_.includes(['개인', '가족', '업무'], list.category)) {
      if (!checked('category', list.category)) {
        return false;
      }
    } else if (!checked('category', '기타')) {
      return false;
    }
    return true;
  };

  Constructor.prototype.load = function() {
    var self = this;
    $.getJSON("/lists", function(data) {
      self.lists = data;
      self.render();
      self.clearForm();
    });
  };

  Constructor.prototype.render = function() {
    var self = this;
    $("#main").toggleClass("no-list", (this.lists.length <= 0));
    var html = _.map(this.lists, function(list) {
      if (self._visible(list)) {
        list.doneStr = list.done ? 'done' : '';
        return self.listTemplate(list);
      }
      return "";
    });
    $("ul.lists").html(html.join("\n"));
    $("ul.lists .check").click(self.postDone.bind(this));
    $(".list .remove").click(self.removeList.bind(this));
  };

  Constructor.prototype.clearForm = function() {
    $("#form-list input").val("");
    $("#form-list select[name='category']").val("개인");
    $("#form-list select[name='priority']").val("2");
    $("#form-list input:first").focus();
  };

  Constructor.prototype._findList = function(e) {
    var el = $(e.currentTarget).closest('li');
    var id = el.data('id');
    return  _.find(this.lists, {id: id});
  };

  Constructor.prototype.postDone = function(e) {
    var list = this._findList(e);
    if (!list) {
      return;
    }
    var self = this;
    $.ajax({
      url: '/lists/' + list.id,
      method: 'PUT',
      dataType: 'json',
      data: {
        done: list.done ? false : true
      },
      success: function(data) {
        list.done = data.done;
        self.render();
      }
    });
  };

  Constructor.prototype.postList = function() {
    var self = this;
    $.post("/lists", $("#form-list").serialize(), function(data) {
      console.log(data);
      self.lists.push(data);
      self.render();
      self.clearForm();
    });
  };

  Constructor.prototype.removeList = function(e) {
    var list = this._findList(e);
    if (!list) {
      return;
    }
    var self = this;
    if (confirm('정말로 삭제하시겠습니까?')) {
      $.ajax({
        url: '/lists/' + list.id,
        method: 'DELETE',
        dataType: 'json',
        success: function(data) {
          self.lists = _.reject(self.lists, function(l) {
            return l.id === list.id;
          });
          var el = $(e.currentTarget).closest('li');
          el.remove();
        }
      });
    }
  };

  return Constructor;

} ();
