function Todos($todosWrapper) {
    this.todos = [];
    this.$todosComponent = $todosWrapper;

    this.init();

    this.$todoTextbox = this.$todosComponent.find(".todo-textbox");

    this.$todosList = this.$todosComponent.find(".todos-list");

    this.$todoTextbox.focus();

    this.handleNoTodosFound();

}

Todos.prototype.init = function() {
    // Cache of the template
    var $template = $("#todosTemplate");
    // Get the contents of the template
    var templateHtml = $template.html();
    var cth = templateHtml;
    // var cth = templateHtml.replace(/{{title}}/g, "Todos");

    debugger;
    // for(var i = 0; i < actions.length; i++) {

    // }
    // var cth = templateHtml.replace(/{{action 'handleToggleAllTodoChecked'}}/g, "this.handleToggleAllTodoChecked()");
    this.$todosComponent.html(cth);
}

Todos.prototype.handleAddTodos = handleAddTodos;

Todos.prototype.createTodoAndAppend = createTodoAndAppend;

Todos.prototype.handleTodoChecked = handleTodoChecked;

Todos.prototype.handleToggleAllTodoChecked = handleToggleAllTodoChecked;

Todos.prototype.handleDeleteSelected = handleDeleteSelected;

Todos.prototype.handleDeleteTodo = handleDeleteTodo;

Todos.prototype.handleMarkAsCompleted = handleMarkAsCompleted;

Todos.prototype.handleNoTodosFound = handleNoTodosFound;

function handleAddTodos() {
    var todo = this.$todoTextbox.val();
    var t = { key: "todo" + (this.todos.length + 1), value: todo, isCompleted: false, isSelected: false };
    this.todos.push(t);
    this.createTodoAndAppend(t);

    this.handleNoTodosFound();
}

// function buildTodosList() {
//     var $todosList = this.$todosList;
//     $todosList.html("");
//     for(var i = 0; i < todos.length; i++) {
//         var t = todos[i];
//         createTodoAndAppend(t);
//     }
// }

function createTodoAndAppend(t) {
    var $todosList = this.$todosList;
    var todoList = $("<li />");
    var label = $("<label />");
    var checkbox = $("<input type='checkbox' />");
    checkbox[0].onchange = this.handleTodoChecked.bind(this, checkbox[0], t);
    var contentSpan = $("<span class='todo-content'>" + t.value + "</span>");
    label.append(checkbox);
    label.append(contentSpan);
    var deleteSpan = $("<span class='glyphicon glyphicon-trash delete-todo'></span>");
    deleteSpan[0].onclick = this.handleDeleteTodo.bind(this, deleteSpan[0], t);
    todoList.append(label);
    todoList.append(deleteSpan);
    $todosList.append(todoList);
}

function handleTodoChecked(el, todo) {
    var todos = this.todos;
    for(var i = 0; i < todos.length; i++) {
        var t = todos[i];
        if(todo.key === t.key) {
            t.isSelected = $(el).prop("checked");
        }
    }
}

function handleToggleAllTodoChecked() {
    var $todosList = this.$todosList;
    var todos = this.todos;
    for(var i = 0; i < todos.length; i++) {
        var t = todos[i];
        t.isSelected = true;
        $todosList.find("li:nth-child(" + (i + 1) + ") > label > input[type=checkbox]").prop("checked", true);
    }
}

function handleDeleteSelected() {
    var $todosList = this.$todosList;
    var todos = this.todos;
    for(var i = todos.length - 1; i >= 0; i--) {
        var t = todos[i];
        if(t.isSelected) {
            todos.splice(i, 1);
            $todosList.find("li:nth-child(" + (i + 1) + ")").remove();
        }
    }

    this.handleNoTodosFound();
}

function handleDeleteTodo(el, todo) {
    // debugger;
    var todos = this.todos;
    for(var i = todos.length - 1; i >= 0; i--) {
        var t = todos[i];
        if(todo.key === t.key) {
            todos.splice(i, 1);
        }
    }
    $(el).closest("li").remove();

    this.handleNoTodosFound();
}

function handleMarkAsCompleted() {
    var $todosList = this.$todosList;
    var todos = this.todos;
    for(var i = todos.length - 1; i >= 0; i--) {
        var t = todos[i];
        if(t.isSelected) {
            t.isCompleted = true;
            $todosList.find("li:nth-child(" + (i + 1) + ")").addClass("completed");
        }
    }
}

function handleNoTodosFound() {
    var $todosList = this.$todosList;
    var $noTodosEl = $todosList.find("li.no-todos");
    if($noTodosEl.length > 0) {
        $noTodosEl.remove();
    }
    if(this.todos.length === 0) {
        var li = $("<li class='text-center no-todos' />");
        li.text("No Todos found. Add one");
        $todosList.append(li);
    }
}