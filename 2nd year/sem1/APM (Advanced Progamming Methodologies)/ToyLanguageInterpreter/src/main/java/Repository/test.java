package Repository;

import java.util.Arrays;
import java.util.List;

import static java.util.stream.Collectors.toList;

public class test {
    public static void main(String[] args) {
        List<Integer> numbers = Arrays.asList(-2, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15);

        String result = numbers.stream()
                .filter(n -> (n % 2 == 0 || n % 3 == 0) && n >= 2)
                .map(n -> "A" + n + "B")
                .reduce("", (s1, s2) -> s1 + s2);
        System.out.println(result);

        List<Integer> numbers2 = Arrays.asList(-2, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16);
        int result2 = numbers2.stream()
                .filter(n -> n % 4 == 0)
                .map(n -> n + 1)
                .reduce(0, (n1, n2) -> (n1 + n2) % 2);
    }
}
