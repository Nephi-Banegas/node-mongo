const MongoClient = require("mongodb").MongoClient;

const dboper = require("./operations");

const url = "mongodb://localhost:27017/";
const dbname = "nucampsite";

MongoClient.connect(url, { useUnifiedTopology: true })
  .then((client) => {
    console.log("Connected correctly to server");

    const db = client.db(dbname);

    db.dropCollection("campsites")
      .then((result) => {
        console.log("Dropped Collection", result);
      })
      .catch((err) => console.log("No collection to drop."));

    dboper
      .insertDocumnet(
        db,
        { name: "Breadcrumb Trail Campground", description: "test" },
        "campsites"
      )
      .then((result) => {
        console.log("Insert Document: ", result.ops);

        return dboper.findDocumnets(db, "campsites");
      })
      .then((docs) => {
        console.log("Found Documents: ", docs);

        return dboper.updateDocumnet(
          db,
          { name: "Breadcrumb Trail Campground" },
          { description: "updated Test Description" },
          "campsites"
        );
      })
      .then((result) => {
        console.log("update Document Count: ", result.result.nModified);
        return dboper.findDocumnets(db, "campsites");
      })
      .then((docs) => {
        console.log("Found Documents: ", docs);

        return dboper.removeDocumnet(
          db,
          { name: "Breadcrumb Trail Campground" },
          "campsites"
        );
      })
      .then((result) => {
        console.log("Deleted Document Count: ", result.deletedCount);

        client.close();
      })
      .catch((err) => {
        console.log(err);
        client.close();
      });
  })

  .catch((err) => console.log(err));
