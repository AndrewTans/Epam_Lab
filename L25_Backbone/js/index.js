var President = Backbone.Model.extend({
  defaults: {
    name: 'John',
    surname: '',
    rating: 0
  },
  validate: function(attributes) {
    if (attributes.surname === '') {
      console.log('Cant be empty');
      return 'Cant be empty';
    }
  },

  initialize: function(attributess) {
    // alert('Hello underlings, i am ' + attributess.name); 
  }
});

var PresidentsCollection = Backbone.Collection.extend({
  model: President
});

var presidentsCollection = new PresidentsCollection([{
  name: 'George',
  surname: 'Washington',
  rating: 10
}, {
  name: 'Barack',
  surname: 'Obama',
  rating: 10
}]);


presidentsCollection.push(new President({
  name: 'Petro',
  surname: 'Poroshenko',
  rating: 15
}));

console.log(presidentsCollection);

var PresidentsView = Backbone.View.extend({
  tagName: 'tbody',

  render: function() {

    this.$el.html(`<tr>
                      <td>Name</td>
                      <td>Surname</td>
                      <td>Rating</td>
                   </tr>`);

    this.model.each((el) => {
      console.log(el);
      let president = new PresidentView({
        model: el
      })
      console.log(president);
      this.$el.append(president.render().$el);
    });
    return this;
  }
});

var PresidentView = Backbone.View.extend({
  tagName: 'tr',
  className: 'president',

  render: function() {
    console.log(this.model.get());
    this.$el.html(`<td>${this.model.get('name')}</td>
                   <td>${this.model.get('surname')}</td>
                   <td>${this.model.get('rating')}</td>`);
    return this
  },

  initialize: function(args) {
    args.model.on('change', () => {
      this.render();
    });
  },
});

let temp = new PresidentsView({
  model: presidentsCollection
});

$('table').html(temp.render().$el);

let formView = Backbone.View.extend({
  tagName: 'tr',
  initialize: function(presidents) {

    $('#btn').on('click', function() {
      let tempObj = {
        name: $('#name').val(),
        surname: $('#surname').val(),
        rating: $('#rating').val()
      }
      presidents.model.push(new President(tempObj));
      presidents.render();

      $('#name').val('');
      $('#surname').val('')
      $('#rating').val('')
    })


  }
});

let form = new formView(temp);