# Pokedex App [WIP]

> Still in development...

---

## Getting started

- Clone the repository

### Development

- Run the follow command:
```bash
 sudo docker-compose up -d --build
```
- Access http://localhost:8080

- To stop, run the follow command:
```bash
 sudo docker-compose down -v --rmi local --remove-orphans
```

---

### Production

- Run the follow command:
```bash
 sudo docker-compose -f docker-compose-prod.yml up -d --build && sudo docker image prune -f
```
- Access http://localhost:3000

- To stop, run the follow command:
```bash
 sudo docker-compose down -v --rmi local --remove-orphans
```

---
## TO DO list

> 1. Add tests ✅
> 2. Add production scripts ✅
> 3. Add a container with pokemon info
> 4. Add filter buttons and search bar
> 5. Add responsive styles
> 6. Keep catch'em all