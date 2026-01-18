<?php

namespace App\ApiResource;

use ApiPlatform\JsonSchema\Schema;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Get;
use ApiPlatform\OpenApi\Model;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * DTO pour l'inscription d'un restaurateur
 */
#[ApiResource(
    operations: [
        new Post(
            uriTemplate: '/register',
            name: 'auth_register',
            openapi: new Model\Operation(
                summary: "Inscription d'un restaurateur",
                description: 'Crée un nouveau compte restaurateur avec les informations du restaurant',
                tags: ['Authentication'],
                requestBody: new Model\RequestBody(
                    description: 'Données d\'inscription du restaurateur',
                    required: true,
                    content: new \ArrayObject([
                        'application/json' => [
                            'schema' => [
                                'type' => 'object',
                                'properties' => [
                                    'restoName' => ['type' => 'string', 'example' => 'Le Bon Restaurant'],
                                    'restoDescription' => ['type' => 'string', 'example' => 'Un restaurant convivial'],
                                    'ville' => ['type' => 'string', 'example' => 'Paris'],
                                    'latitude' => ['type' => 'number', 'format' => 'float', 'example' => 48.8566],
                                    'longitude' => ['type' => 'number', 'format' => 'float', 'example' => 2.3522],
                                    'email' => ['type' => 'string', 'format' => 'email', 'example' => 'gogo@gmail.com'],
                                    'openingHours' => [
                                        'type' => 'array',
                                         'items' => [
                                                'type' => 'object',
                                                'properties' => [
                                                    'day' => ['type' => 'string'],
                                                    'opens_at' => ['type' => 'string', 'nullable' => true],
                                                    'closes_at' => ['type' => 'string', 'nullable' => true],
                                                ],
                                            ],
                                            'example' => [
                                                ['day' => 'Lundi', 'opens_at' => '09:00', 'closes_at' => '18:00'],
                                                ['day' => 'Mardi', 'opens_at' => '09:00', 'closes_at' => '18:00'],
                                                ['day' => 'Mercredi', 'opens_at' => '09:00', 'closes_at' => '18:00'],
                                                ['day' => 'Jeudi', 'opens_at' => '09:00', 'closes_at' => '18:00'],
                                                ['day' => 'Vendredi', 'opens_at' => '09:00', 'closes_at' => '18:00'],
                                                ['day' => 'Samedi', 'opens_at' => '10:00', 'closes_at' => '23:00'],
                                                ['day' => 'Dimanche', 'opens_at' => null, 'closes_at' => null],
                                            ]
                                    ],
                                ]
                            ]
                        ]
                    ])
                )   
            )
        )
    ]
)]
class RegisterDto
{
    #[Assert\NotBlank(message: 'Le nom du restaurant est obligatoire')]
    #[Assert\Length(max: 255)]
    public string $restoName;

    #[Assert\Length(max: 255)]
    public ?string $restoDescription = null;

    #[Assert\Length(max: 255)]
    public ?string $ville = null;

    #[Assert\Type(type: 'float')]
    #[Assert\Range(min: -90, max: 90)]
    public ?float $latitude = null;

    #[Assert\Type(type: 'float')]
    #[Assert\Range(min: -180, max: 180)]
    public ?float $longitude = null;

    /**
     * @var array<int, array{day: string, open: string, close: string}>|null
     */
    public ?array $openingHours = [
        ['day' => 'Lundi', 'opens_at' => '09:00', 'closes_at' => '18:00'],
        ['day' => 'Mardi', 'opens_at' => '09:00', 'closes_at' => '18:00'],
        ['day' => 'Mercredi', 'opens_at' => '09:00', 'closes_at' => '18:00'],
        ['day' => 'Jeudi', 'opens_at' => '09:00', 'closes_at' => '18:00'],
        ['day' => 'Vendredi', 'opens_at' => '09:00', 'closes_at' => '18:00'],
        ['day' => 'Samedi', 'opens_at' => '10:00', 'closes_at' => '23:00'],
        ['day' => 'Dimanche', 'opens_at' => null, 'closes_at' => null],
    ];

    #[Assert\NotBlank(message: 'L\'email est obligatoire')]
    #[Assert\Email(message: 'L\'email n\'est pas valide')]
    #[Assert\Length(max: 255)]
    public string $email;

    #[Assert\NotBlank(message: 'Le mot de passe est obligatoire')]
    #[Assert\Length(min: 8, minMessage: 'Le mot de passe doit contenir au moins 8 caractères')]
    public string $password;
}

/**
 * DTO pour la connexion utilisateur
 */
#[ApiResource(
    operations: [
        new Post(
            uriTemplate: '/login',
            name: 'auth_login',
            openapi: new Model\Operation(
                summary: 'Connexion utilisateur',
                description: 'Authentifie un utilisateur et retourne un token d\'accès',
                tags: ['Authentication'],
                responses: [
                    '200' => new Model\Response(
                        description: 'Connexion réussie',
                        content: new \ArrayObject([
                            'application/json' => [
                                'schema' => [
                                    'type' => 'object',
                                    'properties' => [
                                        'access_token' => ['type' => 'string'],
                                        'token_type' => ['type' => 'string', 'example' => 'Bearer'],
                                        'expires_in' => ['type' => 'integer', 'example' => 3600],
                                        'user' => ['type' => 'object']
                                    ]
                                ]
                            ]
                        ])
                    ),
                    '401' => new Model\Response(
                        description: 'Identifiants invalides',
                        content: new \ArrayObject([
                            'application/json' => [
                                'schema' => [
                                    'type' => 'object',
                                    'properties' => [
                                        'message' => ['type' => 'string', 'example' => 'Identifiants incorrects']
                                    ]
                                ]
                            ]
                        ])
                    )
                ]
            )
        )
    ]
)]
class LoginDto
{
    #[Assert\NotBlank(message: 'L\'email est obligatoire')]
    #[Assert\Email(message: 'L\'email n\'est pas valide')]
    public string $email;

    #[Assert\NotBlank(message: 'Le mot de passe est obligatoire')]
    public string $password;
}

/**
 * DTO pour la déconnexion
 */
#[ApiResource(
    operations: [
        new Post(
            uriTemplate: '/logout',
            name: 'auth_logout',
            openapi: new Model\Operation(
                summary: 'Déconnexion',
                description: 'Invalide le token d\'accès actuel de l\'utilisateur',
                tags: ['Authentication'],
                security: [['bearerAuth' => []]],
                responses: [
                    '204' => new Model\Response(description: 'Déconnexion réussie'),
                    '401' => new Model\Response(description: 'Non authentifié')
                ]
            )
        )
    ]
)]
class LogoutDto
{
    // Pas de propriétés - utilise le token Bearer dans l'en-tête
}

/**
 * DTO pour la vérification d'email
 */
#[ApiResource(
    operations: [
        new Get(
            uriTemplate: '/verify-email/{id}/{hash}',
            name: 'auth_verify_email',
            openapi: new Model\Operation(
                summary: 'Vérification email',
                description: 'Vérifie l\'adresse email d\'un utilisateur via un lien de vérification',
                tags: ['Authentication'],
                parameters: [
                    new Model\Parameter(
                        name: 'id',
                        in: 'path',
                        required: true,
                        schema: ['type' => 'integer'],
                        description: 'ID de l\'utilisateur'
                    ),
                    new Model\Parameter(
                        name: 'hash',
                        in: 'path',
                        required: true,
                        schema: ['type' => 'string'],
                        description: 'Hash de vérification'
                    ),
                    new Model\Parameter(
                        name: 'expires',
                        in: 'query',
                        required: false,
                        schema: ['type' => 'integer'],
                        description: 'Timestamp d\'expiration'
                    ),
                    new Model\Parameter(
                        name: 'signature',
                        in: 'query',
                        required: false,
                        schema: ['type' => 'string'],
                        description: 'Signature du lien'
                    )
                ],
                responses: [
                    '200' => new Model\Response(
                        description: 'Email vérifié avec succès',
                        content: new \ArrayObject([
                            'application/json' => [
                                'schema' => [
                                    'type' => 'object',
                                    'properties' => [
                                        'message' => ['type' => 'string', 'example' => 'Email vérifié avec succès']
                                    ]
                                ]
                            ]
                        ])
                    ),
                    '403' => new Model\Response(
                        description: 'Lien de vérification invalide ou expiré',
                        content: new \ArrayObject([
                            'application/json' => [
                                'schema' => [
                                    'type' => 'object',
                                    'properties' => [
                                        'message' => ['type' => 'string', 'example' => 'Lien de vérification invalide']
                                    ]
                                ]
                            ]
                        ])
                    )
                ]
            )
        )
    ]
)]
class VerifyEmailDto
{
    public int $id;
    public string $hash;
}
