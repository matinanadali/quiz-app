int counter() {
    static int counter = 0;
    counter ++;
    return counter;
}

int main() {
    count(); count(); count();
    printf("%d\n", count());
    return 0;
}