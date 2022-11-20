# Project si5-ci-bdfp
 
## VERSION 2 - Prise de commande a table 

#### Comment lancer le projet ?

- Lancement du backend :
``` shell
$ cd nestjs/
$ ./start-all.sh
```
- Arrêt du backend 
``` shell
$ cd nestjs/
$ ./stop-all.sh
```

- Lancement de l'interface pour les telephones
``` shell
$ cd front-end-specific
$ npm run start
```


- Lancement de l'interface pour la tablette centrale
``` shell
$ cd frontend-commun
$ npm run start
```

- Lancement de la gestion des plats pour la cuisine
``` shell
$ cd kitchen-client
$ ./start-all.sh
$ ./stop-all.sh # Pour stopper
```


## VERSION 1 - WorkFlow & BFF
### Branching strategy
This project is decomposed in 2 parts : 
- WorkFlow part : FrontEnd manages the WorkFlow
- BFF part : Backend For Frontend

#### WorkFlow version
**Contributors** : Fernandez Nicolas / Guillaume Piccina

**How to contribute**
For contributing, you need to follow this rules and work on the correct branch : 
- `master-workflow` : Production branch, for pushing some code on it, you have to create a pull-request.
- `develop-workflow` : You can work on this branch and merge some features that you created
- `develop-workflow/:what_you_want_to_create` : In this branch, you can create what do you want and create a pull request to the develop branch


#### BFF version
Contributors : Yann Brault / D'Andréa William

**How to contribute**
For contributing, you need to follow this rules and work on the correct branch :
- `master-bff` : Production branch, for pushing some code on it, you have to create a pull-request.
- `develop-bff` : You can work on this branch and merge some features that you created
- `develop-bff/:what_you_want_to_create` : In this branch, you can create what do you want and create a pull request to the develop branch
