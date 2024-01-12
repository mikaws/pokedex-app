# Pokedex App [WIP]

> https://pokedex-webapp-mikaws.vercel.app/


You can access with the link above, but the app is still under development.


## Getting started

- Clone the repository

### Development

- Run the follow command to build and start your local server:
```bash
 sudo docker-compose up -d --build
```
- Access http://localhost:8080

- To stop and remove the images and containers, run the follow command:
```bash
 sudo docker-compose down -v --rmi local --remove-orphans
```

---

### Production

- Run the follow command to build and start your local server:
```bash
 sudo docker-compose -f docker-compose-prod.yml up -d --build && sudo docker image prune -f
```
- Access http://localhost:3000

- To stop and remove the images and containers, run the follow command:
```bash
 sudo docker-compose down -v --rmi local --remove-orphans
```

---
## TO DO list

> 1. Add tests ✅
> 2. Add production scripts ✅
> 3. Add responsive styles ✅
> 4. Add a container with pokemon info ✅
> 5. Add pokemon type labels
> 6. Add filter buttons and search bar
> 7. Keep catch'em all
