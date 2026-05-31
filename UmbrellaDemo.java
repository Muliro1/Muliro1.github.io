/**
 * Demonstrates {@link Umbrella} construction and {@link Object#toString()}.
 */
public class UmbrellaDemo {

    public static void main(String[] args) {
        Umbrella umbrella = new Umbrella("navy blue", true);

        // Passing the Umbrella reference: println uses String.valueOf, which calls toString()
        System.out.println(umbrella);
    }
}
