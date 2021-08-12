
exports.getAllThreads = (req, res, next) => {
    res.json({ message: 'Tout les threads son reçu '});
};

exports.getOneThread = (req, res, next) => {
    res.json({ message: 'un Thread reçu'});
};

exports.createThread = (req, res, next) => {
    res.json({ message: "création d'un thread"});
};

exports.modifyThread = (req, res, next) => {
    res.json({ message: "modification d'un thread"});
}

exports.deleteThread = (req, res, next) => {
    res.json({ message: "suppression d'un thread"});
}