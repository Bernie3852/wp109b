function star(n)
{
    var stars = []
    for (var i = 0; i != n; ++i)
    {
        stars.push("*");
    }
    console.log(stars);
}
star(7);

function between(a, b)
{
    var numbers = [];
    for (var i = a; i != b; ++i)
    {
        numbers.push(i);
    }
    console.log(numbers);
}
between(9, 29);

function isPrime(n)
{
    for (var i = 2; i < n ** 0.5; ++i)
    {
        if (n % i == 0)
        {
            return 0;
        }
    }
    return 1;
}

function primebetween(a, b)
{
    var primes = [];
    for (var i = a; i != b; ++i)
    {
        if (isPrime(i))
            primes.push(i);
    }
    console.log(primes);
}
primebetween(7, 67); 
