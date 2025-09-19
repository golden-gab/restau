# MCD/MLD - SaaS Restaurant Multi-Tenant
*Documentation Technique - Architecture Base de Données*

---

## Architecture Multi-Tenant Recommandée

### Modèle Principal : **Restaurant = Tenant**

Oui, le modèle `Restaurant` doit être votre tenant principal, car c'est l'entité métier centrale autour de laquelle gravitent toutes les fonctionnalités.

## 1. Entités Principales

### Users (Utilisateurs)
```sql
users:
- id (PK)
- name
- email (unique)
- password
- email_verified_at
- role (enum: 'super_admin', 'restaurant_owner')
- created_at
- updated_at
```

### Restaurants (Tenants)
```sql
restaurants:
- id (PK)
- owner_id (FK -> users.id)
- name
- slug (unique)
- description
- logo_path
- phone
- address
- email
- whatsapp_number
- opening_hours (JSON)
- status (enum: 'active', 'inactive', 'suspended')
- subscription_id (FK -> subscriptions.id)
- created_at
- updated_at
```

### Subscriptions (Abonnements)
```sql
subscriptions:
- id (PK)
- restaurant_id (FK -> restaurants.id)
- plan_id (FK -> plans.id)
- status (enum: 'active', 'cancelled', 'expired', 'trial')
- starts_at
- ends_at
- trial_ends_at
- created_at
- updated_at
```

### Plans (Forfaits)
```sql
plans:
- id (PK)
- name
- description
- price
- billing_cycle (enum: 'monthly', 'yearly')
- features (JSON)
- max_menu_items
- max_orders_per_month
- is_active
- created_at
- updated_at
```

## 2. Entités Métier (Scoped par Restaurant)

### Categories
```sql
categories:
- id (PK)
- restaurant_id (FK -> restaurants.id) [TENANT SCOPE]
- name
- description
- image_path
- sort_order
- is_active
- created_at
- updated_at
```

### Plat
```sql
Plat:
- id (PK)
- restaurant_id (FK -> restaurants.id) [TENANT SCOPE]
- category_id (FK -> categories.id)
- name
- description
- price
- image_path
- is_available
- created_at
- updated_at
```

### Menu Item Options
<!-- ```sql
Plat_options:
- id (PK)
- restaurant_id (FK -> restaurants.id) [TENANT SCOPE]
- menu_item_id (FK -> menu_items.id)
- name (ex: "Sans piment", "Boisson incluse")
- type (enum: 'checkbox', 'radio', 'select')
- price_modifier (decimal, peut être négatif)
- is_required
- created_at
- updated_at
``` -->

### Orders
```sql
orders:
- id (PK)
- restaurant_id (FK -> restaurants.id) [TENANT SCOPE]
- order_number (unique per restaurant)
- customer_name
- customer_phone
- customer_whatsapp
- items (JSON) - snapshot des items commandés
- total_amount
- status (enum: 'pending', 'confirmed', 'preparing', 'ready', 'delivered', 'cancelled')
- notes
- ordered_at
- created_at
- updated_at
```

### Order Items
```sql
order_items:
- id (PK)
- restaurant_id (FK -> restaurants.id) [TENANT SCOPE]
- order_id (FK -> orders.id)
- menu_item_id (FK -> menu_items.id)
- quantity
- unit_price
- total_price
- selected_options (JSON)
- created_at
- updated_at
```

## 3. Entités pour Évolutions Futures

### Customers
```sql
customers:
- id (PK)
- restaurant_id (FK -> restaurants.id) [TENANT SCOPE]
- name
- phone
- whatsapp
- email
- address
- total_orders
- total_spent
- last_order_at
- loyalty_points
- created_at
- updated_at
```

### Loyalty Programs
```sql
loyalty_programs:
- id (PK)
- restaurant_id (FK -> restaurants.id) [TENANT SCOPE]
- name
- description
- points_per_euro
- redemption_threshold
- reward_value
- is_active
- created_at
- updated_at
```

### Payments
```sql
payments:
- id (PK)
- restaurant_id (FK -> restaurants.id) [TENANT SCOPE]
- order_id (FK -> orders.id)
- amount
- currency
- method (enum: 'mobile_money', 'card', 'cash')
- status (enum: 'pending', 'completed', 'failed', 'refunded')
- transaction_id
- provider_response (JSON)
- created_at
- updated_at
```

### Analytics
```sql
analytics:
- id (PK)
- restaurant_id (FK -> restaurants.id) [TENANT SCOPE]
- metric_name
- metric_value
- period (enum: 'daily', 'weekly', 'monthly')
- date
- metadata (JSON)
- created_at
- updated_at
```

## 4. Configuration Multi-Tenant Laravel

### Middleware Tenant
```php
// app/Http/Middleware/TenantMiddleware.php
class TenantMiddleware
{
    public function handle($request, Closure $next)
    {
        if ($restaurantId = $request->route('restaurant')) {
            $restaurant = Restaurant::findOrFail($restaurantId);
            app()->instance('current_restaurant', $restaurant);
            
            // Set tenant scope for all queries
            config(['database.default_tenant' => $restaurant->id]);
        }
        
        return $next($request);
    }
}
```

### Global Scopes
```php
// app/Models/Traits/BelongsToRestaurant.php
trait BelongsToRestaurant
{
    protected static function booted()
    {
        static::addGlobalScope(new RestaurantScope);
        
        static::creating(function ($model) {
            if (!$model->restaurant_id) {
                $model->restaurant_id = app('current_restaurant')->id;
            }
        });
    }
    
    public function restaurant()
    {
        return $this->belongsTo(Restaurant::class);
    }
}
```

## 5. Structure des URLs

```
# Panel Super Admin
/admin

# Panel Restaurant Owner
/restaurant/{restaurant}/admin

# Front-end Public
/menu/{restaurant_slug}
/order/{restaurant_slug}
```

## 6. Relations Clés

### User → Restaurant (1:N)
```php
// User.php
public function restaurants()
{
    return $this->hasMany(Restaurant::class, 'owner_id');
}

// Restaurant.php
public function owner()
{
    return $this->belongsTo(User::class, 'owner_id');
}
```

### Restaurant → Subscription (1:1)
```php
// Restaurant.php
public function subscription()
{
    return $this->hasOne(Subscription::class);
}
```

## 7. Avantages de cette Architecture

### ✅ **Isolation des Données**
- Chaque restaurant a ses propres données
- Sécurité renforcée par design

### ✅ **Flexibilité des Abonnements**
- Un utilisateur peut avoir plusieurs restaurants
- Chaque restaurant a son propre forfait

### ✅ **Évolutivité**
- Structure prête pour les paiements en ligne
- Analytics par restaurant
- Programme de fidélité

### ✅ **Performance**
- Index sur restaurant_id pour toutes les requêtes
- Possibilité de sharding par restaurant si nécessaire

## 8. Filament Panel Configuration

```php
// AdminPanelProvider.php (Super Admin)
Filament::serving(function () {
    Filament::registerNavigationGroups([
        'Gestion des Restaurants',
        'Abonnements',
        'Analytics Globales',
    ]);
});

// RestaurantPanelProvider.php (Restaurant Owner)
Filament::serving(function () {
    $restaurant = app('current_restaurant');
    
    Filament::registerNavigationGroups([
        'Menu',
        'Commandes',
        'Clients',
        'Paramètres',
    ]);
});
```

Cette architecture vous permet de démarrer avec le MVP tout en ayant une base solide pour les évolutions futures. Chaque restaurant est complètement isolé, et vous pouvez facilement ajouter de nouvelles fonctionnalités sans impacter l'existant.

---

## 9. Checklist d'Implémentation

### Phase 1 - Core MVP
- [ ] Configuration multi-tenant Laravel
- [ ] Modèles User, Restaurant, Subscription, Plan
- [ ] Trait BelongsToRestaurant
- [ ] Global Scopes pour isolation
- [ ] Filament Panels (Super Admin + Restaurant)

### Phase 2 - Fonctionnalités Menu
- [ ] Modèles Category, MenuItem, MenuItemOption
- [ ] Interface de gestion du menu
- [ ] Page publique d'affichage menu
- [ ] Génération URL WhatsApp

### Phase 3 - Gestion Commandes
- [ ] Modèles Order, OrderItem
- [ ] Interface de suivi des commandes
- [ ] Historique des commandes

### Phase 4 - Évolutions Futures
- [ ] Système de paiement
- [ ] Analytics et statistiques
- [ ] Programme de fidélité
- [ ] Application mobile

---

*Document généré le 28 août 2025 - Version 1.0*