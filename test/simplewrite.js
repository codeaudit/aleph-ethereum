contract('SimpleWrite', function(accounts) {
  describe('creation', function(){
    it("can create contract", function(done) {
      SimpleWrite.new()
        .then(function(c) {
          assert(!!c)
        })
        .then(done)
    });

    it("owned by creator", function(done) {
      var c;
      var creator = accounts[3];
      SimpleWrite.new({from: creator})
        .then(function(_c) {
          c = _c;
          return c.owner();
        })
        .then(function(owner) {
          assert.equal(owner, creator);
        })
        .then(done)
    });

  });

  describe('write', function(){
    it("emits write event", function(done) {
      var holder = accounts[1]
      var creator = accounts[3]
      var namespace = 'mediachain.test'
      var payload = 'deadbeef'
      SimpleWrite.new({from: creator})
        .then((s) => {
          let we = s.Write()
          we.watch((err, event) =>{
            assert.equal(event.args.payer, holder)
            assert.equal(event.args.namespace, namespace)
            assert.equal(event.args.payload, payload)
            assert.equal(event.args.value, payload.length * s.REGISTRATION_PRICE_PER_B)
            we.stopWatching()
          })

          return s.write(namespace, payload)
        })
    })
  })


  // describe('registerSong', function(){
  //   it("can register song", function(done) {
  //     var c;
  //     var holder = accounts[1];
  //     var payload = 'deadbeef';
  //     var namespace = 'mediachain';
  //     var nsAccount = accounts[2];
  //     var oracle = accounts[3];
  //     SimpleWrite.new()
  //       .then(function(_t) {
  //         c = _t;
  //         return c.registerSong(namespace, song, {from: holder})
  //       })
  //       .then(function() {
  //         return c.completeOrder(namespace, song,
  //                                    nsAccount, {from: oracle});
  //       })
  //       .then(function(tx) {
  //         return c.balanceOf(holder);
  //       })
  //       .then(function(balance) {
  //         assert.equal(balance, 500000-10000)
  //       })
  //       .then(function() {
  //         return c.balanceOf(nsAccount);
  //       })
  //       .then(function(balance) {
  //         assert.equal(balance, 10000)
  //       })
  //       .then(function() {
  //         return c.checkInvariant.call()
  //       })
  //       .then(function(result) {
  //         assert.isTrue(result);
  //       })
  //       .then(done);
  //   });
  //   it("emits events on registration", function(done) {
  //     var c;
  //     var holder = accounts[1];
  //     var song = 'f30b5e64-a8a4-47af-99e2-f1e2aa97e569';
  //     var namespace = 'mediachain';
  //     var nsAccount = accounts[2];
  //     var oracle = accounts[3];
  //     SimpleWrite().new()
  //       .then(function(_t) {
  //         c = _t;
  //         var ope = c.OrderPlaced();
  //         ope.watch(function(err, event) {
  //           assert.equal(event.args.payer, holder);
  //           assert.equal(event.args.store, namespace);
  //           assert.equal(event.args.item, song);
  //           assert.equal(event.args.value, 10000);
  //           ope.stopWatching();
  //         });
  //         var oce = c.OrderCompleted();
  //         oce.watch(function(err, event) {
  //           assert.equal(event.args.payer, holder);
  //           assert.equal(event.args.store, namespace);
  //           assert.equal(event.args.item, song);
  //           assert.equal(event.args.value, 10000);
  //           oce.stopWatching();
  //           done();
  //         });

  //         return c.registerSong(namespace, song, {from: holder})
  //       })
  //       .then(function() {
  //         return c.completeOrder(namespace, song,
  //                                    nsAccount, {from: oracle});
  //       })
  //   });
  // });

});
