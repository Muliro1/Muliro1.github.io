/**
 * Simple object class with color and foldable flag.
 */
public class Umbrella {

    private String color;
    private boolean isFoldable;

    /**
     * Parameterized constructor.
     *
     * @param color      umbrella color
     * @param isFoldable whether the umbrella can fold
     */
    public Umbrella(String color, boolean isFoldable) {
        this.color = color;
        this.isFoldable = isFoldable;
    }

    /**
     * String representation (Eclipse-style: Source → Generate toString()).
     */
    @Override
    public String toString() {
        return "Umbrella [color=" + color + ", isFoldable=" + isFoldable + "]";
    }
}
